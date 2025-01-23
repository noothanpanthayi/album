import { useActionState } from "react";
import { uploadFile} from "@/app/uploadphotos/(form)/actions";
import {SubmitButton} from "@/app/uploadphotos/(form)/submit";

const initialState={
    message:null
}
export function UploadForm() {
    const [state, formAction]=useActionState(uploadFile, initialState);

  return (
    <>
      <div className="form-wrapper">
        <form action={formAction}>
             <input type="file" id="file" name="file" accept="images/*"/>
             <SubmitButton/>
        </form>
        {state?.status && (
            <div>{state?.message}</div>
        )}
      </div>
    </>
  );
}
