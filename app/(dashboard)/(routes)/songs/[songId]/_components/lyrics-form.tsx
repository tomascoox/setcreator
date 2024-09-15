'use client'

import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Song as PrismaSong } from '@prisma/client'

// Ensure Song type includes lyrics
interface SongWithLyrics extends PrismaSong {
    lyrics: string; // Add this line
}

interface LyricsFormProps {
    initialData: SongWithLyrics
    songId: string
}

const formSchema = z.object({
    lyrics: z
        .string()
})

export const LyricsForm = ({
    initialData,
    songId,
}: LyricsFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing(current => !current)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lyrics: initialData?.lyrics || '',
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/songs/${songId}`, values)
            toast.success('Song updated')
            toggleEdit()
            router.refresh()
        } catch {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Song lyrics
                <Button
                    onClick={toggleEdit}
                    variant="ghost"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit lyrics
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <p
                    className={cn(
                        'text-sm mt-2 whitespace-pre-line',
                        !initialData.lyrics &&
                            'text-slate-500 italic'
                    )}
                >
                    {initialData.lyrics || 'No lyrics'}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="lyrics"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea
                                            disabled={isSubmitting}
                                            placeholder="e.g. I'm singing the first verse..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
