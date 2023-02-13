import { FC, useContext, useEffect, useState } from 'react';
import JoditReact from 'jodit-react-ts';
import { Jodit } from 'jodit';
import 'jodit/build/jodit.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { dataChange } from '../store/slices/EditorSlice';
import { Button } from '@mui/material';
import axios from 'axios';
import './TextEditor.css'
import { WebsocketContext } from '../WebscoketContext';

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
    
    const [websocketData, setWebsocketData] = useState<any>();
    const data = useSelector((state: any) => state.draft);
    const dispatch = useDispatch();

    const socket = useContext(WebsocketContext);

    useEffect(() => {

        socket.on('connect', () => {
           console.log('Connected!'); 
        });

        socket.emit('ReqFullData')

        socket.on('ResFullData', (data) => {
            setWebsocketData(data);
        });

        return () => {
            socket.off('connect');
            socket.off('ReqFullData');
        } 

    }, [])
    
    
    const handleChange = (dispatchValue: string) => {
        dispatch(dataChange(dispatchValue));
    }
    
    
    const SaveChanges = () => {
        socket.emit('ReqAddingData', data);
    }

    const config = {
        extraButtons: ['doctor', 'offer', 'today', 'insert', 'change' ],
        uploader: {
            insertImageAsBase64URI: true
        },
        showCharsCounter: false,
        showWordsCounter: false,
        showXPathInStatusbar: false,
        hidePoweredByJodit: true,
        cleanHTML: {
            fillEmptyParagraph: false,
            nl2brInPlainText: false,
        }
    }

    
    return(
        <div>
            <div style={{ height: "500px", width: '90vw', margin: 'auto' }}>
                <Button style={{marginBottom: "10px"}} variant='contained' onClick={() => SaveChanges()}>Сохранить</Button>
                <JoditReact defaultValue={content} onChange={(value: string) => handleChange(value) } config={config} />

                <div className='ExistDataBlock'>
                    {websocketData ? websocketData.map((el: any) => <div key={el._id} dangerouslySetInnerHTML={{__html: el.data}}></div>) : ""}
                </div>
            </div>
        </div>
    )
}


export default TextEditor;

function openSocket(arg0: string, arg1: { transports: string[]; }) {
    throw new Error('Function not implemented.');
}
