import {useState, useContext} from 'react'
// import { Link } from 'react-router-dom';
// import * as apiCalls from '../../hooks/APIrequests';
// import {CalendarFormat} from '../../hooks/JSONBodies';
import { useQuery } from "@tanstack/react-query";
import './Calendar.css';
import moment from 'moment';
// import { AppContext } from '../../context/AppContext';
// import { EventsContext } from '../../context/TaskScheduleContexts/EventsContext';

let CalendarFormat = {
    "Week_1": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    },
    "Week_2": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    },
    "Week_3": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    },
    "Week_4": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    },
    "Week_5": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    },
    "Week_6": {
        "Boxes": [{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false},{"Day": "", "Date":  "", "Events": [], "Today": false, "Selected_Day": false}]
    }
};

export const Calender = ({arrayOfEvents, filterEvents, returnEvents }) => {
    // const { changeMonth, incomingMonthDate } = useContext(EventsContext)
    const myEvents = [{
        "Event_Title": 'Pay Day',
        "Event_Date": '2024-04-24',
        "Priority": 1
    },{
        "Event_Title": 'Buy Zoomlion food',
        "Event_Date": '2024-04-24',
        "Priority": 3
    },{
        "Event_Title": 'Quantumania',
        "Event_Date": '2024-04-17',
        "Priority": 3
    },{
        "Event_Title": 'Buy T-Roll',
        "Event_Date": '2024-04-25',
        "Priority": 1
    },{
        "Event_Title": 'KFC Date',
        "Event_Date": '2024-04-27',
        "Priority": 2
    }]

    const [renderedCalendar, setrenderedCalendar] = useState({...CalendarFormat});
    // const {appColor, appColorDisabled} = useContext(AppContext);
    const appColor = '#6fa6e6'; 

    const [theMoment, setTheMoment] = useState(moment().format().substring(0,10));
    const [monthInView, setMonthInView] = useState(moment().format('MMMM') + " " + moment().format('YYYY'));
    const {isLoading: renderingDays } = useQuery({ queryKey: ["calendarRender"], queryFn: async () => {return await renderDays(moment().format().substring(0, 10))} });

    async function renderDays(newMoment){        
        const latestMoment = newMoment ? newMoment : theMoment; // theMoment is the month that is being viewed... the latest moment is the new moment if it is being toggled

        // console.log('latest moment', latestMoment);
        // IF the month has been toggled, set theMoment to be the new month to be viewed
        if (latestMoment !== theMoment) {
            setTheMoment(latestMoment);
            setMonthInView(moment(latestMoment).format('MMMM') + " " + moment(latestMoment).format('YYYY'))
        }

        // 
        let daysInMonth = moment(latestMoment).daysInMonth(); // the number of days in the month to be viewed
        let dayNum  = moment().format().substring(8, 10); // the day of the month of today's date
        let DayOfWeekIndex  = moment(latestMoment).startOf('month').day(); // the index day of the week we would start rendering the calendar... E.G IF this is index: 2, the 1st day of the week should start from tuesday

        // 
        // 
        // 
        
        let filledCalendar = {...CalendarFormat};
        let stagedEvents = arrayOfEvents ? arrayOfEvents : [...myEvents];

        let currentDay = 1; // first day of every month
        
        let startedFilling = false; // the first box is set for monday... but if the first day of the month is on a latter day (e.g friday), we will not start filling the calendar boxes with day number's yet.

        // for each week in our calendar format
        Object.keys(filledCalendar).forEach((week, weekIndex) => {
            // console.log(daysInMonth);
            // if the days are already completely filled in before entering Week_6 boxes, then delete the entire Week_6 calendar row
            // if (currentDay > daysInMonth && weekIndex === 5) {
            //     delete filledCalendar['Week_6'];
            //     return;
            // }

            // for each box (day) in a week...
            filledCalendar[week]['Boxes'].forEach((box, boxIndex)=> {

                // console.log('here', filledCalendar);

                // if the box is in an index before the 1st day of the week, make it empty
                if (!startedFilling) {
                    box.Day = "";
                    box.Events = [];
                    box.Today = false;
                    box.Selected_Day = false;
                    // console.log('if0');
                }

                // console.log('bi+1', boxIndex + 1);
                // console.log('dowi', DayOfWeekIndex);
                // console.log('dn', dayNum);

                // if we are yet to input the 1st day of the month number and we are in the right index day...
                if (currentDay === 1 && ((boxIndex+1) === DayOfWeekIndex || (DayOfWeekIndex === 0 && boxIndex === 6) ) ) {
                    // console.log('here');
                    extraCalendarProcessing(box, latestMoment, currentDay, stagedEvents, dayNum); // insert day number in empty box, identify if it is today's date, input events for this day
                    startedFilling = true;
                    currentDay++;
                    // console.log('if1');
                }
                else if (startedFilling === true && currentDay <= daysInMonth && boxIndex < 7){ // if we have begun inserting day numbers and we havent filled all days of the month
                    extraCalendarProcessing(box, latestMoment, currentDay, stagedEvents, dayNum); // insert day number in empty box, identify if it is today's date, input events for this day
                    currentDay++;
                    // console.log('if2');
                }
                else{ // if we have filled all days of the month, render the rest as empty boxes
                    box.Day = "";
                    box.Events = [];
                    box.Today = false;
                    box.Selected_Day = false;
                    // console.log('if3');
                }
            })
        });

        console.log(filledCalendar);
        setrenderedCalendar(filledCalendar); // render the calendar we have populated
        // filterEvents(moment().format().substring(0,10));
        return [1];
    }

    function extraCalendarProcessing(box, latestMoment, currentDay, stagedEvents, dayNum){
        box.Day = currentDay.toString();  // insert day number in empty box
        let boxDate = currentDay < 10 ? moment(latestMoment).format().substring(0,8) + '0' + currentDay : moment(latestMoment).format().substring(0,8) + currentDay;  // identify if it is today's date
        box.Date = boxDate;
        box.Events = [];

        // console.log('pre error', stagedEvents);

         // input events for this day
        stagedEvents.forEach(task => {
            if (task.Event_Date.substring(0,10) === boxDate) {
                switch (task.Priority) {
                    case 1:
                        box.Events.push({Event_Details: task, Event_Color: '#E15151'});                                    
                        break;                                
                    case 2:
                        box.Events.push({Event_Details: task, Event_Color: '#FFB42B'});                                    
                        break;
                    case 3:
                        box.Events.push({Event_Details: task, Event_Color: '#1BC000'});                                    
                        break;                                                                
                    default:
                        box.Events.push({Event_Details: task, Event_Color: appColor});                                    
                        break;
                }
            }
        });


        // identify if it is today's date
        let cDay = currentDay < 10 ? '0' + currentDay : currentDay.toString();
        if (cDay === dayNum.toString() && latestMoment === moment().format().substring(0,10)) {
            box.Today = true;
            box.Selected_Day = false;
        }
        else{
            box.Today = false;
            box.Selected_Day = false;
        }
    }

    function returnCalendarBoxClass(box){
        // console.log('box');
        if (box.Selected_Day) {
            return box.Day === '' ? "calendarDateBox invisibleBox" : "calendarDateBox selectedStyle"
        }
        else if (box.Today) {
            return box.Day === '' ? "calendarDateBox invisibleBox" : "calendarDateBox todayStyle"
        }
        else{
            return box.Day === '' ? "calendarDateBox invisibleBox" : "calendarDateBox";
        }
    }

    function selectedDay(weekIndex, boxIndex){
        let daysEvents = [];
        let calendarCopy = {...CalendarFormat};
        Object.keys(calendarCopy).forEach((week, wI) => {
            calendarCopy[week]['Boxes'].forEach((box, bI)=> {
                if (wI === weekIndex && bI === boxIndex){
                    let eventsIn = [];
                    box.Events.forEach(element => {
                        eventsIn.push(element.Event_Details);
                    });
                    
                    returnEvents(box);
                    box.Selected_Day = true;
                    daysEvents = box.Events;
                }
                else{
                    box.Selected_Day = false;
                }
            })
        });

        
        setrenderedCalendar(calendarCopy);
    }

    function navToPrevMonth(){
        let currentMoment = theMoment;
        let newmoment = moment(currentMoment).subtract(1, 'months').format().substring(0,10)
        
        renderDays(newmoment);
    }

    function navToNextMonth(){
        let currentMoment = theMoment;
        let newmoment = moment(currentMoment).add(1, 'months').format().substring(0,10);
        let newMonth = moment(newmoment).format('MMM');
        // changeMonth(newMonth);
        renderDays(newmoment);
    }

    return (
        <div className="calendarContainer">
            <div className="monthNameArea">
                <span className="monthDiv">{monthInView}</span>
                <div className="d-flex justify-content-center gap-0 my-auto">
                    <button onClick={() => navToPrevMonth()} className='btn btn-light' style={{borderRadius: '50%'}}>
                        <i className="fa fa-chevron-up monthToggleArrow"></i>
                    </button>
                    <button onClick={() => navToNextMonth()} className='btn btn-light' style={{borderRadius: '50%'}}>
                        <i className="fa fa-chevron-down monthToggleArrow"></i>
                    </button>
                </div>
            </div>
            <div className="weekDayArea mx-auto">
                <div className="weekDayBox">Mon</div>
                <div className="weekDayBox">Tue</div>
                <div className="weekDayBox">Wed</div>
                <div className="weekDayBox">Thu</div>
                <div className="weekDayBox">Fri</div>
                <div className="weekDayBox">Sat</div>
                <div className="weekDayBox">Sun</div>
            </div>

            {
                !renderingDays && Object.keys(renderedCalendar).map((week, weekIndex) => (
                    <div key={weekIndex} className="weekRow mx-auto">
                        {
                            renderedCalendar[week]['Boxes'].map((box, boxIndex) => (
                                <div key={weekIndex + "-" + boxIndex} onClick={() => selectedDay(weekIndex, boxIndex)} className={returnCalendarBoxClass(box)}>
                                    <span className={box.Day !== '' ? "date" : "date invisible"}>{box.Day !== '' ? box.Day : '-'}</span>
                                    <div className={box.Events.length ? "bubbles" : "bubbles invisible"}>
                                        {
                                            !box.Events.length ? <i className="fa fa-circle eventBubble"></i>
                                            :
                                            box.Events.map((tsk, tskIndex) => (
                                                <i key={tskIndex} style={{color:tsk.Event_Color}} className="fa fa-circle eventBubble"></i>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))      
                        }
                    </div>
                ))
            }
        </div>
    )
}
