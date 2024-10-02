import { diff_match_patch } from 'diff-match-patch';

export function TextDiff ({ oldText, newText } : { oldText: string, newText: string }) {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(oldText, newText);
    dmp.diff_cleanupSemantic(diffs);
  
    const renderDiffs = diffs.map(([type, text]: [number, string], index: number) => {
      if (type === -1) {
        // Deletion
        return (
          <span key={index} style={{ backgroundColor: '#ffdddd' }}>
            {text}
          </span>
        );
      } else if (type === 1) {
        // Insertion
        return (
          <span key={index} style={{ backgroundColor: '#ddffdd' }}>
            {text}
          </span>
        );
      } else {
        // Unchanged
        return <span key={index}>{text}</span>;
      }
    });
  
    return <div>{renderDiffs}</div>;
  };
  