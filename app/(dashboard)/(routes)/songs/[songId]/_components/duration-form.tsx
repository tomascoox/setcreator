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
import { Input } from '@/components/ui/input'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface DurationFormProps {
    initialData: {
        duration: number | '' | null
    }
    songId: string
}

const formSchema = z.object({
    duration: z
        .string()
        .min(1, 'Required')
        .regex(/^(\d{1,2}):(\d{2})$/, 'Input duration in the format m:ss'),
})

function secondsToDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, '0')}`
}

export const DurationForm = ({
    initialData,
    songId,
}: DurationFormProps) => {
    const [isEditing, setIsEditing] = useState(false)

    const toggleEdit = () => setIsEditing(current => !current)

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            duration:
                typeof initialData.duration === 'number'
                    ? secondsToDuration(initialData.duration)
                    : '',
        },
    })

    const { isSubmitting, isValid } = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Trigger form validation
        await form.trigger()

        const formErrors = form.formState.errors

        if (Object.keys(formErrors).length > 0) {
            toast.error('Form validation failed')
            return
        }

        try {
            const [minutes, seconds] = values.duration
                .split(':')
                .map(Number)
            const totalSeconds = minutes * 60 + seconds

            // Update the song duration
            await axios.patch(`/api/songs/${songId}`, {
                ...values,
                duration: totalSeconds,
            })

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
                Duration
                <Button
                    onClick={toggleEdit}
                    variant="ghost"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit duration
                        </>
                    )}
                </Button>
            </div>{' '}
            {!isEditing && (
                <p className="text-sm mt-2">
                    {secondsToDuration(Number(initialData.duration))}
                </p>
            )}{' '}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            defaultValue={field.value}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            disabled={isSubmitting}
                                            placeholder='e.g. "3:13"'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />{' '}
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={isSubmitting}
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
