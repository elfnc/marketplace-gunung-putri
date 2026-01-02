"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import LinkExtension from '@tiptap/extension-link'
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading2, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // 👈 TAMBAHKAN BARIS INI (FIX ERROR SSR)
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-primary underline' }
      })
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "min-h-[250px] w-full rounded-b-md border border-t-0 bg-transparent px-4 py-3 text-sm focus-visible:outline-none prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-headings:mb-2 prose-headings:mt-4",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  const ToolbarButton = ({ 
    isActive, 
    onClick, 
    icon: Icon 
  }: { isActive?: boolean, onClick: () => void, icon: any }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn("h-8 w-8 p-0", isActive && "bg-secondary text-secondary-foreground")}
    >
      <Icon className="h-4 w-4" />
    </Button>
  )

  return (
    <div className="flex flex-col border rounded-md bg-white">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50/50 p-1 px-2 rounded-t-md">
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBold().run()} 
            isActive={editor.isActive('bold')} 
            icon={Bold} 
        />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleItalic().run()} 
            isActive={editor.isActive('italic')} 
            icon={Italic} 
        />
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} 
            isActive={editor.isActive('heading', { level: 2 })} 
            icon={Heading2} 
        />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBulletList().run()} 
            isActive={editor.isActive('bulletList')} 
            icon={List} 
        />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleOrderedList().run()} 
            isActive={editor.isActive('orderedList')} 
            icon={ListOrdered} 
        />
        <ToolbarButton 
            onClick={() => editor.chain().focus().toggleBlockquote().run()} 
            isActive={editor.isActive('blockquote')} 
            icon={Quote} 
        />
      </div>
      
      {/* AREA KETIK */}
      <EditorContent editor={editor} />
    </div>
  )
}