"use client";
import { Button } from "../ui/Button";
import { storyblokEditable, SbBlokData } from "@storyblok/react/rsc";
import { useFormState } from "react-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "../ui/Dialog";
import { createMessage } from "@/actions/CreateMessage";
import { useFormStatus } from "react-dom";
import { Entertainer } from "@ui/Entertainer";
import { cn } from "@/helpers/csMerge";

export interface MessageMeBlokData extends SbBlokData {
  name: boolean;
  email: boolean;
  message: boolean;
  phone: boolean;
  sideNavForm: boolean;
  targetEmail?: string;
  welcomeMessage: string;
  buttonForm: boolean;
}

export interface MessageMeProps {
  blok: MessageMeBlokData;
}

export function MessageMe({ blok }: MessageMeProps) {
  if (blok.sideNavForm) {
    return (
      <section className="flex flex-col items-center md:min-w-80 w-full max-md:px-2 md:w-8/12 lg:w-1/2 mb-4 md:mb-8 lg:mb-0">
        <Form
          message={blok.welcomeMessage}
          className="lg:sticky lg:top-32 large-shadow"
        />
      </section>
    );
  }
  if (blok.buttonForm) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button> MESSAGE ME</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <Form
              buttonForm={blok.buttonForm}
              className="shadow-none"
              message={blok.welcomeMessage}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Entertainer
      className="relative w-full items-center justify-between min-h-[250px] mb-4 md:mb-8 lg:mb-16 flex flex-col md:flex-row"
      {...storyblokEditable(blok)}
    >
      <div className="w-full max-md:text-center md:w-96 h-full max-md:mb-4">
        <p className="">{blok.welcomeMessage}</p>
      </div>
      <div className="max-md:hidden w-[2px] border-l-2 border-dashed border-gray-3 h-96 mx-2" />
      <div className="h-full flex items-center justify-end w-full">
        <Form className="md:w-11/12 lg:w-2/3 xl:w-2/4" />
      </div>
    </Entertainer>
  );
}

interface FormProps {
  message?: string;
  buttonForm?: boolean;
  className?: string;
}

function Form({ buttonForm = false, message, className }: FormProps) {
  const initialState = {
    message: "",
  };
  const [state, formAction] = useFormState(createMessage, initialState);
  return (
    <form
      action={formAction}
      className={cn(
        "flex w-full font-roboto flex-col justify-center bg-gray-1 rounded-lg p-2 md:p-4 shadow-lg",
        className,
      )}
    >
      {message && <h2 className="font-black mb-2 text-lg">{message}</h2>}
      <div className="flex flex-col group">
        <label htmlFor="name" className="pl-1 group-hover:font-black">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="rounded-md shadow-sm px-1"
        />
      </div>
      <div className="flex flex-col group">
        <label htmlFor="email" className="pl-1 group-hover:font-black">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="rounded-md shadow-sm px-1"
        />
      </div>
      <div className="flex flex-col group">
        <label htmlFor="phone" className="pl-1 group-hover:font-black">
          Phone
        </label>
        <input
          type="phone"
          id="phone"
          name="phone"
          className="rounded-md shadow-sm px-1"
        />
      </div>
      <div className="flex flex-col group">
        <label htmlFor="message" className="pl-1 group-hover:font-black">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="h-24 md:h-48 rounded-md shadow-sm p-1"
        />
      </div>
      <p aria-live="polite" className="mt-2">
        {state?.message}
      </p>
      <div className="flex gap-2">
        {(buttonForm || buttonForm == false) &&
        state?.message !== "Message received, thank you!" ? (
          <SubmitButton />
        ) : (
          ""
        )}

        {buttonForm && (
          <DialogClose asChild>
            <Button className="w-1/2 mt-3" rounded="medium">
              Close
            </Button>
          </DialogClose>
        )}
      </div>
    </form>
  );
}

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <p className="slate-500 px-4 py-2 animate-pulse">Sending...</p>
      ) : (
        <Button
          className="w-1/2 mt-3 shadow-lg rounded-md"
          asChild
          color="#E12727"
        >
          <button type="submit" disabled={pending} className="border-2 p-2">
            Send
          </button>
        </Button>
      )}
    </>
  );
}
