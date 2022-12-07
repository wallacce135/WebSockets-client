import { FC } from 'react';
import JoditReact from 'jodit-react-ts';
import { Jodit } from 'jodit';
import 'jodit/build/jodit.min.css';

interface IProps {
    content: string;
    setContent: (value: string) => void
}

Jodit.defaultOptions.controls.doctor = {
    
    exec: (editor) => {
        // @ts-ignore
        editor.selection.insertNode(
            editor.create.fromHTML('{@doctor}')
        );
    }
}

Jodit.defaultOptions.controls.offer = {
    exec: (editor) => {
        // @ts-ignore
        editor.selection.insertNode(
            editor.create.fromHTML('{@offer}')
        );
    }
}


Jodit.defaultOptions.controls.insert = {
    name: '{@doctor.firstName}',
    icon: 'list',
    list: ['{@doctor.secondName}', '{@doctor.specialty}', '{@doctor.fullName}'],
    exec: (editor, current, options) => {

        console.log(current)

        // @ts-ignore
        editor.selection.insertNode(
            editor.create.fromHTML(options.button.name)
        )
    }
}

Jodit.defaultOptions.controls.today = {
    name: 'today',
    exec: (editor, current, options) => {
        // @ts-ignore
        editor.selection.insertNode(
            editor.create.fromHTML('{@today}')
        )
    },
}

Jodit.defaultOptions.controls.change = {
    name: 'change',
    popup: (editor, current, control, close, button) => {
        
        const form = editor.create.fromHTML(
            `<form><input type="text"/>
                <button type="submit">Doctor Firstname</button>
                <button type="submit">Doctor Secondname</button>
                <button type="submit">Doctor Specialty</button>
                <button type="submit">Doctor Fullname</button>
                <button type="submit">Offer</button>
            </form>`
        )

        editor.e.on(form, 'submit', (e: any, id: number)=> {
            e.preventDefault();
            
            // @ts-ignore            
            let text: String = editor.value;
            
            console.log(e.submitter.innerText);
            let inputValue = form.querySelector('input')!.value;

            if(inputValue === ''){
                alert('Переделать alert');
                return;
            }

            if(e.submitter.innerText === "Doctor Firstname") text = text.replaceAll(inputValue, "{@doctor.firstName}");
            if(e.submitter.innerText === "Doctor Secondname") text = text.replaceAll(inputValue, "{@doctor.secondName}");
            if(e.submitter.innerText === "Doctor Specialty") text = text.replaceAll(inputValue, "{@doctor.specialty}");
            if(e.submitter.innerText === "Doctor Fullname") text = text.replaceAll(inputValue, "{@doctor.fullName}");
            if(e.submitter.innerText === "Offer") text = text.replaceAll(inputValue, "{@offer}");
            
            // @ts-ignore
            editor.value = text;
            
        })

        return form
    },
}


const TextEditor: FC<IProps> = ({content, setContent}) => {


    const handleChange = (dispatchValue: string) => {
        setContent(dispatchValue);
    }

    const config = {
        theme: 'dark',
        extraButtons: ['doctor', 'offer', 'today', 'insert', 'change' ]
    }

    
    return(
        <div>
            <div style={{ height: "500px", width: '90vw', margin: 'auto' }}>
                <JoditReact defaultValue={content} onChange={(value: string) => handleChange(value) } config={config} />
            </div>
        </div>
    )
}


export default TextEditor;