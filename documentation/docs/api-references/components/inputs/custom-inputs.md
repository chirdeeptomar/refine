---
id: custom-inputs
title: Custom Inputs
---

import markdownInput from '@site/static/img/guides-and-concepts/components/inputs/custom-inputs/markdown-input.png';

You can use custom components in table columns and form fields for working with custom data. For some data types, displaying and editing as plain text may cause user experience problems. Examples where custom component usage may be useful include: markdown (with markdown editor), json based rich text (draft, quill like editors), html (a wysiwyg html editor).

refine uses Ant Design's [`<Form>`](https://ant.design/components/form/) components to control and work with form data. Ant Design supports custom form items inside [`<Form.Item>`](https://ant.design/components/form/#Form.Item) components. These items should be controllable via their `value` prop and should implement `onChange` (or a custom callback name specified by `<Form.Item>`s [`trigger` prop](https://ant.design/components/form/#Form.Item)).

[Refer to Ant Design docs for more detailed information about `<Form>`. &#8594](https://ant.design/components/form/)

## Example

In this example we'll demonstrate how to use custom input fields for markdown data by adding a markdown editor to edit and create forms.

```tsx title="/src/pages/posts/edit.tsx"
import React, { useState } from "react";
import {
    Edit,
    Form,
    Input,
    IResourceComponentsProps,
    useForm,
} from "@pankod/refine";

//highlight-start
import ReactMarkdown from "react-markdown";
import ReactMde from "react-mde";
//highlight-end

//highlight-next-line
import "react-mde/lib/styles/css/react-mde-all.css";


import { IPost } from "interfaces";

export const PostEdit: React.FC = (props) => {
    const { formProps, saveButtonProps } = useForm<IPost>();

    //highlight-start
    const [selectedTab, setSelectedTab] = useState<"write" | "preview">(
        "write",
    );
    //highlight-end

    return (
        <Edit {...props} saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                //highlight-start
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <ReactMde
                        selectedTab={selectedTab}
                        onTabChange={setSelectedTab}
                        generateMarkdownPreview={(markdown) =>
                            Promise.resolve(
                                <ReactMarkdown>{markdown}</ReactMarkdown>,
                            )
                        }
                    />
                </Form.Item>
                //highlight-end
            </Form>
        </Edit>
    );
};
```

<div style={{textAlign: "center"}}>
    <img src={markdownInput} />
</div>
<br/>


## Live Codesandbox Example

<iframe src="https://codesandbox.io/embed/refine-custom-inputs-example-mfmh6?autoresize=1&fontsize=14&module=%2Fsrc%2Fpages%2Fposts%2Fedit.tsx&theme=dark&view=preview"
    style={{width: "100%", height:"80vh", border: "0px", borderRadius: "8px", overflow:"hidden"}}
    title="refine-custom-inputs-example"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>