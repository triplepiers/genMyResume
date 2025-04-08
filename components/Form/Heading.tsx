import { useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormDescription, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type formKey = "name" | "surname" | "profession" | "city" | "province" | "postcode" | "phone" | "email";
const formSchema = z.object({
  name:       z.string().min(2, { message: "Name must be at least 2 characters.", }).regex(/^[A-Za-z]+$/, { message: "Contains ONLY characters", }),
  surname:    z.string().min(2, { message: "Surname must be at least 2 characters.", }),
  profession: z.string().regex(/^[A-Za-z\s]+$/).optional(),
  city:       z.string().regex(/^[A-Za-z\s]+$/).optional(),
  province:   z.string().regex(/^[A-Za-z\s]+$/).optional(),
  postcode:   z.string().regex(/^\d{6}$/, { message: '6-bit numbers'}).optional(),
  phone:      z.string().regex(/^\d+$/).max(11).optional(),
  email:      z.string().min(1, { message: "Required"}).email({ message: "Invalid Format"})
})

export const Heading = (props: { updateFormMeta: Function, updateFormStatus: Function }) => {
  useEffect(() => {
    props.updateFormMeta({
      title: 'Resume Heading',
      desc: 'We suggest including an <b>email</b> and <b>phone number</b>'
    })
  })

  useEffect(() => {
    let data = localStorage.getItem('1');
    if (data) {
      for (let [key, val] of Object.entries(JSON.parse(data)) ) {
        form.setValue(key as formKey, val as string)
      }
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: 这边有个 defaultValues 从 undefined => defined 的报错，不管了
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await localStorage.setItem('1', JSON.stringify(values)); // 存在 localStorage
    props.updateFormStatus();                                // go next
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-5 space-y-0 w-full max-w-140">
        <div className="col-span-2 sm:col-span-1"><FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2 sm:col-span-1"><FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>
        <div className="col-span-2"><FormField
          control={form.control}
          name="profession"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profession</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Sales Manager" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2 sm:col-span-1"><FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Shenzhen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2 sm:col-span-1"><FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Guangdong" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2 sm:col-span-1"><FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 518000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2"><FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="e.g. (45) 6789 0123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <div className="col-span-2"><FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address*</FormLabel>
              <FormControl>
                <Input placeholder="e.g. joe_doe@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /></div>
        <button type="submit" id='GO' className="w-0 h-0"></button>
      </form>
    </Form>
  )
};