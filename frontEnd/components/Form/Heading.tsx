import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormItem, FormField, FormLabel, FormControl, FormMessage } from "../ui/form";
import { Input, PhoneInput } from "../ui/input";

import { handlePhone } from "@/lib/utils";
import axios from "@/lib/axios";

type formKey = "name" | "surname" | "profession" | "city" | "province" | "postcode" | "phone" | "email";
const formSchema = z.object({
  name:       z.string().min(2, { message: "Name must be at least 2 characters.", }).regex(/^[A-Za-z]+$/, { message: "Contains ONLY characters", }),
  surname:    z.string().min(2, { message: "Surname must be at least 2 characters.", }),
  profession: z.optional(z.string().regex(/^[A-Za-z\s]*$/)),
  city:       z.optional(z.string().regex(/^[A-Za-z\s]*$/)),
  province:   z.optional(z.string().regex(/^[A-Za-z\s]*$/)),
  postcode:   z.optional(z.string().regex(/^\d{6}$/, { message: '6-bit numbers'})),
  phone:      z.optional(z.string()),
  email:      z.string().min(1, { message: "Required"}).email({ message: "Invalid Format"})
})

export const Heading = (props: { updateFormMeta: Function, updateFormStatus: Function }) => {
  useEffect(() => {
    props.updateFormMeta({
      title: 'Resume Heading',
      desc: 'We suggest including an <b>email</b> and <b>phone number</b>'
    })
  }, [])

  useEffect(() => {
    // let data = localStorage.getItem('1');
    axios.get('/head').then((res) => {
      if(res.status === 200 && res.data.head.length>0) {
        for (let [key, val] of Object.entries(JSON.parse(res.data.head)) ) {
          if (key==='phone' && (val as string).length>0) { // 删掉 (+862)
            val = (val as string).slice(7)
          }
          form.setValue(key as formKey, val as string)
        }
      }
    }) 
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // TODO: 这边有个 defaultValues 从 undefined => defined 的报错，不管了
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // check Phone: if notNull, add (+862)
    let phone = values.phone;
    if (phone && phone!.length>0) {
      if (phone!.length<9) {
        form.setError('phone', {message: "Incomplete Phone Number"})
        return;
      } else {
        values.phone = `(+862) ${phone}`
      }
    }
    // save to server
    axios.post('/head', {
      data: JSON.stringify(values)
    }).then(res => res.status)
    .then(status => {
      if (status === 200) {
        props.updateFormStatus(); // 没啥要干的了, go next
      }
    })
                                  
  }

  // const handlePhone = (e: any) => {
  //   let neo_ipt_ch = e.nativeEvent.data;
  //   if (neo_ipt_ch) {
  //     if (/^\d$/.test(neo_ipt_ch)) { // add & isNum
  //       let prev = form.getValues('phone');
  //       if (!prev || prev.length < 9) {
  //         if (prev?.length == 4) {
  //           form.setValue('phone', `${prev} ${neo_ipt_ch}`)
  //         } else {
  //           form.setValue('phone', `${prev}${neo_ipt_ch}`)
  //         }
  //       }
  //     }
  //   } else { // delete
  //     let prev = form.getValues('phone');
  //     if (prev) {
  //       if (prev.length == 6) {
  //         form.setValue('phone', prev.slice(0,4))
  //       } else {
  //         console.log(typeof prev.slice(0,-1))
  //         if (prev.length>0) {
  //           form.setValue('phone', prev.slice(0,-1))
  //         }
  //       }
  //     }
  //   }
  // }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-2 gap-5 space-y-0 w-full max-w-100">
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
              <FormLabel>
                Phone <span className="text-gray-500 text-xs font-normal">(8-bit HongKong Phone Number)</span>
              </FormLabel>
              <FormControl>
                <PhoneInput placeholder="e.g. 6789 0123" {...field} onChange={(e) => handlePhone(e, form, 'phone')} />
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