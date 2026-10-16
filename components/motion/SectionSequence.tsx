'use client';

import React, { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { sectionSequence } from '../../lib/motion/motionTokens';

export type SectionStage = 'pending' | 'active' | 'complete' | 'skipped';

type Entry = {
  node: HTMLDivElement;
  requested: boolean;
  status: SectionStage;
};

type SequenceController = {
  activeId: string | null;
  register: (id: string, node: HTMLDivElement, immediate: boolean) => () => void;
  request: (id: string) => void;
  statuses: Record<string, SectionStage>;
};

type SectionMotionState = {
  status: SectionStage;
  ambientAllowed: boolean;
};

const SequenceContext = createContext<SequenceController | null>(null);
const SectionMotionContext = createContext<SectionMotionState | null>(null);

const defaultSectionMotion: SectionMotionState = { status: 'complete', ambientAllowed: true };

const inDocumentOrder = (a: Entry, b: Entry) => {
  const position = a.node.compareDocumentPosition(b.node);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
};

const isMostlyPast = (bounds: DOMRect) =>
  bounds.bottom <= Math.min(window.innerHeight * 0.25, bounds.height * 0.33);

export function SectionSequenceProvider({ children }: { children: React.ReactNode }) {
  const entriesRef = useRef(new Map<string, Entry>());
  const activeRef = useRef<string | null>(null);
  const timerRef = useRef(0);
  const frameRef = useRef(0);
  const [statuses, setStatuses] = useState<Record<string, SectionStage>>({});
  const [activeId, setActiveId] = useState<string | null>(null);

  const publish = useCallback(() => {
    setStatuses(Object.fromEntries([...entriesRef.current].map(([id, entry]) => [id, entry.status])));
    setActiveId(activeRef.current);
  }, []);

  const drain = useCallback(function drainQueue() {
    if (activeRef.current) return;

    const next = [...entriesRef.current]
      .filter(([, entry]) => entry.requested && entry.status === 'pending')
      .sort(([, a], [, b]) => inDocumentOrder(a, b))[0];
    if (!next) return;

    const [id, entry] = next;
    const bounds = entry.node.getBoundingClientRect();
    if (isMostlyPast(bounds)) {
      entry.status = 'skipped';
      publish();
      drainQueue();
      return;
    }
    if (bounds.top >= window.innerHeight + sectionSequence.leadPx) return;

    activeRef.current = id;
    entry.status = 'active';
    publish();
    timerRef.current = window.setTimeout(() => {
      entry.status = 'complete';
      activeRef.current = null;
      timerRef.current = 0;
      publish();
      drainQueue();
    }, sectionSequence.durationMs);
  }, [publish]);

  const register = useCallback((id: string, node: HTMLDivElement, immediate: boolean) => {
    entriesRef.current.set(id, {
      node,
      requested: false,
      status: immediate ? 'active' : 'pending',
    });
    if (immediate && !activeRef.current) {
      // The first section starts its entrance on mount and owns the first
      // animation turn so the next section cannot overlap it.
      activeRef.current = id;
      timerRef.current = window.setTimeout(() => {
        if (activeRef.current !== id) return;
        const current = entriesRef.current.get(id);
        if (current) current.status = 'complete';
        activeRef.current = null;
        timerRef.current = 0;
        publish();
        drain();
      }, sectionSequence.durationMs);
    }
    publish();

    return () => {
      entriesRef.current.delete(id);
      if (activeRef.current === id) {
        if (timerRef.current) window.clearTimeout(timerRef.current);
        timerRef.current = 0;
        activeRef.current = null;
        window.requestAnimationFrame(drain);
      }
      publish();
    };
  }, [drain, publish]);

  const request = useCallback((id: string) => {
    const target = entriesRef.current.get(id);
    if (!target || target.status !== 'pending') return;
    target.requested = true;

    const active = activeRef.current ? entriesRef.current.get(activeRef.current) : null;
    if (active && isMostlyPast(active.node.getBoundingClientRect())) {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      active.status = 'skipped';
      activeRef.current = null;
      timerRef.current = 0;
    }

    for (const entry of entriesRef.current.values()) {
      if (entry === target || entry.status !== 'pending') continue;
      const position = entry.node.compareDocumentPosition(target.node);
      if (!(position & Node.DOCUMENT_POSITION_FOLLOWING)) continue;

      const bounds = entry.node.getBoundingClientRect();
      if (isMostlyPast(bounds)) entry.status = 'skipped';
      else if (bounds.top < window.innerHeight + sectionSequence.leadPx) entry.requested = true;
    }

    publish();
    if (!frameRef.current) {
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = 0;
        drain();
      });
    }
  }, [drain, publish]);

  useEffect(() => () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
  }, []);

  const value = useMemo(() => ({ activeId, register, request, statuses }), [activeId, register, request, statuses]);
  return <SequenceContext.Provider value={value}>{children}</SequenceContext.Provider>;
}

export function useSectionMotion() {
  return useContext(SectionMotionContext) ?? defaultSectionMotion;
}

export function useCanSequenceSection() {
  const controller = useContext(SequenceContext);
  const section = useContext(SectionMotionContext);
  return Boolean(controller && !section);
}

export function SectionSequence({
  children,
  immediate = false,
}: {
  children: React.ReactNode | ((status: SectionStage) => React.ReactNode);
  immediate?: boolean;
}) {
  const controller = useContext(SequenceContext);
  const register = controller?.register;
  const request = controller?.request;
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);
  const status = controller?.statuses[id] ?? (immediate ? 'active' : 'pending');

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node || !register) return;
    return register(id, node, immediate);
  }, [register, id, immediate]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !request || status !== 'pending') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        request(id);
      }
    }, { rootMargin: `0px 0px ${sectionSequence.leadPx}px 0px`, threshold: 0 });

    observer.observe(node);

    // An already-visible section should not wait for an observer delivery after
    // hydration or a client-side route change.
    const bounds = node.getBoundingClientRect();
    if (bounds.top < window.innerHeight + sectionSequence.leadPx && bounds.bottom > 0) {
      request(id);
    }

    return () => observer.disconnect();
  }, [request, id, status]);

  const ambientAllowed = status !== 'pending' && (!controller?.activeId || controller.activeId === id);
  const state = useMemo(() => ({ status, ambientAllowed }), [ambientAllowed, status]);

  return (
    <SectionMotionContext.Provider value={state}>
      <div ref={ref} data-motion-section-state={status} className="w-full">
        {typeof children === 'function' ? children(status) : children}
      </div>
    </SectionMotionContext.Provider>
  );
}
