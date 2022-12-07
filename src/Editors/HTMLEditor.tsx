import {FC, useState} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
// import { html } from '@codemirror/lang-html';
import {json} from '@codemirror/lang-json';

// import {}  from 'js-beautify'
var beautify_html = require('js-beautify')
const options = { indent_size: 2, space_in_empty_paren: true };




interface IProps{
    content: string;
    setContent: (value: string) => void
}


const HTMLEditor: FC<IProps> = ({content, setContent}) => {

    useState(() => {
        content = beautify_html(content, options);
    })


    const handleChange = (value: any): void => {
        console.log(content);
        setContent(value);
    }


    return(
        <div>
            <CodeMirror
                value={content}
                height="500px"
                extensions={[json()]}
                onChange={handleChange}
                theme={sublime} />
        </div>
    )
}


export default HTMLEditor;