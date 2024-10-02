'use client';

import { useEffect, useState } from 'react'
import { diff_match_patch } from 'diff-match-patch'

export function TextDiff({ oldText, newText }: { oldText?: string; newText: string }) {
  const [diff, setDiff] = useState<Array<[number, string]>>([])

  useEffect(() => {
    if (oldText) {
      const dmp = new diff_match_patch()
      const differences = dmp.diff_main(oldText, newText)
      dmp.diff_cleanupSemantic(differences)
      setDiff(differences)
    } else {
      setDiff([[0, newText]])
    }
  }, [oldText, newText])

  const renderDiff = (text: string, type: 'old' | 'new') => {
    let result = []
    let index = 0

    for (let [operation, content] of diff) {
      if (operation === 0 || (operation === -1 && type === 'old') || (operation === 1 && type === 'new')) {
        result.push(
          <span
            key={index}
            className={`${
              operation === -1 ? 'bg-red-100 text-red-800' : 
              operation === 1 ? 'bg-green-100 text-green-800' : ''
            } transition-colors duration-200`}
          >
            {content}
          </span>
        )
        index++
      }
    }

    return result
  }

  return (
    <div className={`flex flex-col ${oldText ? 'lg:flex-row' : ''} gap-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg`}>
      {oldText && (
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Previous Prompt</h2>
          <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm leading-relaxed">
            {renderDiff(oldText, 'old')}
          </pre>
        </div>
      )}
      <div className={`flex-1 ${!oldText ? 'max-w-3xl mx-auto w-full' : ''}`}>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">
          {oldText ? 'Updated Prompt' : 'Current Prompt'}
        </h2>
        <pre className="whitespace-pre-wrap bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-sm leading-relaxed">
          {renderDiff(newText, 'new')}
        </pre>
      </div>
    </div>
  )
}