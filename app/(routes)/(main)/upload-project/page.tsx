"use client"
import { Button } from '@/components/ui/button'
import { handleCreateNewTag, handleGetAllTags } from '@/app/actions/tags'
import React, { useEffect, useState } from 'react'
import { handleGetAllProjects, handleUploadProject } from '@/app/actions/projects'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Badge } from '@/components/ui/badge'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { redirect } from 'next/navigation'


interface Tag {
    id: number, name: string
}
const UploadProject = () => {

    const [tagsTable, setTagsTable] = useState<Tag[]>([])
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [checkBox, setCheckBox] = useState<boolean>(false)
    const [tagname, setTagName] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [link, setLink] = useState<string>('')

    const pushtoSelectedTags = (tag: Tag) => {
        setSelectedTags((prev) => {
            // Prevent duplicates
            if (!prev.some((t) => t.id === tag.id)) {
                return [...prev, tag];
            }
            return prev;
        });
        console.log(selectedTags)
    }
    async function getalltags() {
        const response = await handleGetAllTags()
        setTagsTable(response)
    }
    useEffect(() => {
        getalltags()
    }, [])
    const handleCheckBoxChange = () => {
        setCheckBox(!checkBox)
    }
    const handleSubmitNewTag = async () => {
        const response = await handleCreateNewTag(tagname)
        setTagName('')
        toast.success("Tag created")
        getalltags()
    }

    const handleFinalSubmit = async () => {
        console.log(name, description, checkBox, link, selectedTags)
        toast.success("Project added successfully !")
        await handleUploadProject(name, description, checkBox, selectedTags, link)
        redirect('/my-projects')
    }
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='max-w-1/2 flex flex-col justify-center gap-4 w-1/2 p-3 rounded'>
                <Label className='text-xl'>Enter project Name</Label>
                <Input className='border border-gray-500' value={name} onChange={(e) => setName(e.target.value)} />
                <Label className='text-xl'>Enter project Description</Label>
                <Textarea className='border border-gray-500' value={description} onChange={(e) => setDescription(e.target.value)} />
                <Label className='flex items-center text-xl gap-5'>Is your project contributable? <Checkbox checked={checkBox} onCheckedChange={handleCheckBoxChange} /></Label>
                {checkBox && <Label className='text-xl'>link to contribute</Label>}
                {checkBox && <Input value={link} onChange={(e) => setLink(e.target.value)} className='border border-gray-500' />}
                <div>
                    <Label className='text-xl'>Selected tags</Label>
                    <div>
                        {selectedTags?.map((tag) => <Badge key={tag.id} className='bg-blue-500'>{tag.name}</Badge>)}
                    </div>
                </div>
                {/* input tags  */}
                <Command>
                    <CommandInput className='border border-gray-500 text-lg p-2' placeholder="Search tags" />

                    <CommandList>
                        <CommandEmpty>
                            No results found
                        </CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            {tagsTable?.map((tag) => <CommandItem className='text-xl' onSelect={() => pushtoSelectedTags(tag)} key={tag.id}>{tag.name}</CommandItem>)}
                        </CommandGroup>
                        <CommandSeparator />

                    </CommandList>
                    <Dialog>
                        <DialogTrigger asChild><Button className='w-full'>Tag not here? Create new</Button></DialogTrigger>
                        <DialogContent>
                            <DialogHeader className='flex flex-col gap-3'>
                                <DialogTitle>Create a new tag</DialogTitle>
                                <DialogDescription className='flex flex-col gap-3'>
                                    <Input value={tagname} onChange={(e) => setTagName(e.target.value)} placeholder='enter your tag name'></Input>
                                    <Button onClick={handleSubmitNewTag} className='w-full'>Submit</Button>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </Command>
                <Button onClick={handleFinalSubmit} className='bg-green-500 hover:bg-green-600'>Submit</Button>

            </div>
        </div>
    )
}

export default UploadProject