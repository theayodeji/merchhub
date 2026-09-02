import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from './button';
import { useToast } from './use-toast';

interface CopyButtonProps {
  value: string;
  displayText?: string;
  className?: string;
}

export const CopyButton = ({ value, displayText, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: `Successfully copied ${value} to your clipboard.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        description: 'Please try again manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-6 px-2 text-xs font-mono text-gray-500 hover:text-gray-900 flex items-center gap-1.5 ${className || ''}`}
      onClick={handleCopy}
      title="Copy to clipboard"
    >
      {displayText || value}
      {copied ? <Check className="size-3 text-green-500" /> : <Copy className="size-3" />}
    </Button>
  );
};
