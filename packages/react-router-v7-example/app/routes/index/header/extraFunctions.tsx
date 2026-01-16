import { Download, EllipsisVertical, Share2, Upload } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { resetDocument, useDocument } from '~/context/editor';
import { useDownloadUrl } from '~/lib/utils/download-json';
import { generateSharedDocument } from '~/lib/utils/get-template';
import validateJsonStringValue from '~/lib/utils/validate-json-string';

export function ExtraFunctions() {
  const downloadUrl = useDownloadUrl();
  const document = useDocument();

  const onShare = async () => {
    const hash = generateSharedDocument(document);
    location.hash = hash;
    navigator.clipboard.writeText(location.href);
    alert('The URL has updated and copied, share now!');
  };

  const handleImportJson = (value: string) => {
    const { error, data } = validateJsonStringValue(value);
    if (error || !data) return alert(error || 'Invalid JSON');

    resetDocument(data);
    alert('JSON imported successfully');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <a href={downloadUrl} download={'email-builder.json'}>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Download
          </DropdownMenuItem>
        </a>
        <DropdownMenuItem
          onClick={() => {
            const jsonString = prompt('Paste your JSON here:');
            if (jsonString) {
              handleImportJson(jsonString);
            } else {
              alert('No value provided');
            }
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          Import
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
