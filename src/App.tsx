
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { FC, useState, useRef, useMemo, BaseSyntheticEvent } from 'react';
// import './App.css';
import HTMLEditor from './Editors/HTMLEditor';
import TextEditor from './Editors/TextEditor';

const App: FC = () => {

  const [content, setContent] = useState<string>('{"ФИО" : "Иванов Сергей", "Адрес" : { "Город" : "Москва", "Улица" : "Пятницкая", "Дом" : "35" }}');
  const [tabValue, setTabValue] = useState<string>('1');

  const handleChangeTab = (event: BaseSyntheticEvent, value: string) => {
    setTabValue(value);
  }

  return (
    <div className="App">

      {/* <div className='MainBlock' style={{height: '50vh'}}>{content}</div> */}

      <TabContext value={tabValue}>
        <TabList
              variant='scrollable'
              onChange={handleChangeTab}
              aria-label=""
              allowScrollButtonsMobile
        >
          <Tab label="Редактор" value="1"/>
          <Tab label="HTML Редактор" value="2"/>
        </TabList>


        <TabPanel value='1'>
          <TextEditor content={content} setContent={setContent}/>
        </TabPanel>

        <TabPanel value='2'>
          <HTMLEditor content={content} setContent={setContent}/>
        </TabPanel>


      </TabContext>
      

    </div>
  );
}

export default App;
