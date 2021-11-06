import React, { useEffect } from 'react';
import { useQuill } from "react-quilljs";

const Editor = ({ blog, setBlog, modules, classes }) => {
    const { quill, quillRef } = useQuill({ modules });

  useEffect(() => {
     if (quill) {
       quill.clipboard.dangerouslyPasteHTML(blog.body);
       quill.on('text-change', async () => {
         localStorage.setItem("blog", JSON.stringify(quill.root.innerHTML));
         await setBlog({...blog, body: quill.root.innerHTML})
       });
     }
   }, [quill]);

   return <div className={classes}>
            <div ref={quillRef} />
          </div>
}

export default React.memo(Editor);
