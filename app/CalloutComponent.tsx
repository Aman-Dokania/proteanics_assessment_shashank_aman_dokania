
'use client';

import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useCallback } from 'react';
import { NodeViewProps } from '@tiptap/react';

type CalloutType = 'info' | 'bestPractice' | 'warning' | 'error';

const calloutStyles: Record<CalloutType, { className: string; icon: string; label: string }> = {
  info: {
    className:
      'border-l-4 border-blue-200 bg-blue-50 dark:border-blue-800/50 dark:bg-blue-900/20',
    icon: '💡',
    label: 'Information',
  },
  bestPractice: {
    className:
      'border-l-4 border-green-200 bg-green-50 dark:border-green-800/50 dark:bg-green-900/20',
    icon: '✅',
    label: 'Best Practice',
  },
  warning: {
    className:
      'border-l-4 border-yellow-200 bg-yellow-50 dark:border-yellow-800/50 dark:bg-yellow-900/20',
    icon: '⚠️',
    label: 'Warning',
  },
  error: {
    className:
      'border-l-4 border-red-200 bg-red-50 dark:border-red-800/50 dark:bg-red-900/20',
    icon: '❌',
    label: 'Error',
  },
};

export function CalloutComponent(props: NodeViewProps) {
  const { node, updateAttributes } = props;

  const calloutType = node.attrs.calloutType as CalloutType;

  const cycleCalloutType = useCallback(() => {
    const types = ['info', 'bestPractice', 'warning', 'error'] as CalloutType[];
    const currentIndex = types.indexOf(calloutType);
    const nextType = types[(currentIndex + 1) % types.length];
    updateAttributes({ calloutType: nextType });
  }, [calloutType, updateAttributes]);

  const currentStyle = calloutStyles[calloutType];

  return (
    <NodeViewWrapper
      className={`rounded-lg p-4 my-4 ${currentStyle.className}`}
      data-callout-type={calloutType}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={cycleCalloutType}
          aria-label="Change callout type"
          className="select-none cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          contentEditable={false}
        >
          <span className="text-xl" aria-hidden="true">
            {currentStyle.icon}
          </span>
        </button>
        <div className="flex-1">
          <div
            contentEditable={false}
            className="mb-2 font-medium text-sm uppercase tracking-wider text-gray-600 dark:text-gray-300"
          >
            {currentStyle.label}
          </div>
          {/* Allows nested content */}
          <NodeViewContent className="prose dark:prose-invert max-w-none" />
        </div>
      </div>
    </NodeViewWrapper>
  );
}
