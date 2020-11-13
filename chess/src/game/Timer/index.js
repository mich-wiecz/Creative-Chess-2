import React, {useState, useEffect, useRef, useCallback} from 'react';
import {splitTime} from '@global-functions/splitTime';
import './Timer.scss';
import {selectTime, selectStatistics, selectWinner, selectTeams, officialGameEnded} from 'redux/gameSlice';
import {useSelector, useDispatch} from 'react-redux';
// import variables from 'global.scss';

export default function Timer({ 
    updateTime,
    updateTimerFlag,
    markTimerAsUpdated,
      ...props
}) {

    const dispatch = useDispatch();
    const {isTimeGame, timeStarted, ...timeForTeams} = useSelector(selectTime);
    const {moveFor} = useSelector(selectStatistics);
    const winner = useSelector(selectWinner);
    // const mode = useSelector(selectMode);
    const teams = useSelector(selectTeams);



    const [animationClass, setAnimationClass] = useState('');
    const [newWinner, setNewWinner] = useState(null);
    const [firstTeamTime, setFirstTeamTime] = useState(0);
    const [secondTeamTime, setSecondTeamTime] = useState(0);
    const [firstTeamData, setFirstTeamData] = useState(null);
    const [secondTeamData, setSecondTeamData] = useState(null);
    const [timerAlreadyRunning, setTimerAlreadyRunning] = useState(false);
    const prevTeam = useRef(moveFor);
    let timerId = useRef(null);



    const startFirstTeamTimer = useCallback(() => {
        timerId.current = setInterval(() => {
            setFirstTeamTime(prev => prev - 1000);
            if(firstTeamTime < 0)  dispatch(officialGameEnded({
                winner: secondTeamData.name,
                reason: 'time'
            }))
        }, 1000)
        
     }, [dispatch, firstTeamTime, secondTeamData.name ])

     const startSecondTeamTimer = useCallback(() => {
            timerId.current = setInterval(() => {
                setSecondTeamTime(prev => prev - 1000);
                if(secondTeamTime < 0) dispatch(officialGameEnded({
                    winner: firstTeamData.name,
                    reason: 'time'
                }))
            }, 1000)
     }, [dispatch, secondTeamTime, firstTeamData.name])








    useEffect(() => {
        const {name, color} = teams[0]
        setFirstTeamData({name, color});
        setFirstTeamTime(timeForTeams[name]);
        const {name: secondTeamName, color: secondTeamColor} = teams[1]
        setSecondTeamData({name: secondTeamName, color: secondTeamColor});
        setSecondTeamTime(timeForTeams[secondTeamName])
    }, [teams, timeForTeams])


    useEffect(() => {
        if(timeStarted && !timerAlreadyRunning) {
            startFirstTeamTimer();
            setAnimationClass('game-breakpoint');
            setTimerAlreadyRunning(true);
        } 
    }, [timeStarted, startFirstTeamTimer, timerAlreadyRunning])



    useEffect(() => {
        if (!updateTimerFlag) return;
         if ( timerId) clearInterval(timerId.current);
         updateTime({
             [firstTeamData.name]: firstTeamTime, 
             [secondTeamData.name]: secondTeamTime
         })
         
     }, [updateTimerFlag, firstTeamData.name, secondTeamData.name, firstTeamTime, secondTeamTime, updateTime]);



    useEffect(() => {
        if (moveFor === prevTeam.current || !timerAlreadyRunning) return;
        if (moveFor === firstTeamData.name) {
            startFirstTeamTimer()
            prevTeam.current = firstTeamData.name;
        }
        if (moveFor === secondTeamData.name) {
            startSecondTeamTimer();
            prevTeam.current = secondTeamData.name;
        }
        setAnimationClass('turnCompleted');
        markTimerAsUpdated();
    }, [moveFor, firstTeamData.name, secondTeamData.name, markTimerAsUpdated, dispatch, firstTeamTime, secondTeamTime, startSecondTeamTimer, startFirstTeamTimer, timerAlreadyRunning])





    useEffect(() => {

        if(winner === newWinner) {
            setNewWinner(null)
        } else {
            setNewWinner(winner)
        }
        
    }, [winner, setNewWinner, newWinner]);

    // const isGameOn = mode === 'game' && (isTimeGame ? timeStarted : true);


    useEffect(() => {
        if(newWinner) setAnimationClass('game-breakpoint');
    }, [newWinner])




    const firstTeamTimeObject = splitTime(firstTeamTime, {withoutHours: true});
    const secondTeamTimeObject = splitTime(secondTeamTime, {withoutHours: true});


    const assignClass = (team) => {
        if(animationClass === 'game-breakpoint') return animationClass;
        if (animationClass === 'turnCompleted' && team === moveFor) return animationClass;
        return '';
    }

    if (teams.length < 2) return null;

    return (
                <svg 
                {...props}
                width="400" height="100" version="1.1" viewBox="0 30 260 95" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <g>
                            <g strokeWidth=".33478"></g>
                        </g>
                        <g id="timer" transform="matrix(.56532 0 0 .66453 -19.003 -11.021)">
    
                            <g id="timer-left">
                                <rect x="164.1" y="62.066" width="100" height="140" className="fill-myblue-light" stroke="#292525" strokeWidth="5" />
                                <circle cx="214.1" cy="159.66" r="40" fill="#e6e6e6" stroke="#292525" strokeWidth="5" />
                                <path style={{fill: firstTeamData.color}} d="m197.06 109.23c-0.32508-1.7469-1.225-4.6163-2.1557-6.8729-1.5219-3.6904-3.8608-7.8357-6.0145-10.66-0.0876-0.11493-0.1633-0.21542-0.16811-0.22329-6e-3 -0.0092-0.0604 0.0044-0.15236 0.03787-2.1013 0.76372-3.1879-2.6841-1.1053-3.5071 1.7319-0.68435 3.0439 1.8483 1.6423 3.1701-0.0788 0.07428 0.0215 0.22918 0.83649 1.2916 5.5446 7.2283 9.7837 5.9192 9.04-2.7917-0.12173-1.4257-0.66953-4.5389-1.0218-5.8073-5e-3 -0.01998-0.0185-0.01938-0.12977 0.0062-2.4694 0.56787-3.6204-3.4054-1.3292-4.5882 2.5386-1.3105 4.4546 2.8431 1.9961 4.3273-0.13597 0.08209-0.14924 0.0105 0.10298 0.55551 2.9329 6.3374 5.7891 9.6962 8.419 9.9005 2.6758 0.20784 4.621-3.6037 6.2659-12.278 0.15585-0.8218 0.46493-2.5756 0.46493-2.6382 0-0.01864-0.0246-0.0287-0.11746-0.04819-3.0018-0.62863-2.5823-5.5642 0.473-5.5642 3.0556 0 3.4752 4.9355 0.47299 5.5642-0.0928 0.01944-0.11745 0.02955-0.11745 0.04819 0 0.01299 0.0402 0.25929 0.0893 0.54739 1.782 10.448 3.856 14.789 6.8563 14.348 2.5759-0.37841 5.3502-3.7163 8.1945-9.859 0.26354-0.56917 0.24888-0.49432 0.11283-0.57646-2.4586-1.4842-0.54259-5.6379 1.9961-4.3273 2.2913 1.1828 1.1402 5.1561-1.3292 4.5882-0.11132-0.02558-0.12421-0.02622-0.12972-0.0062-0.14699 0.53346-0.56222 2.5722-0.73684 3.6178-1.0012 5.9947 0.0703 9.7672 2.7424 9.6558 1.7885-0.07454 4.0015-1.9009 6.5721-5.4237 0.38819-0.532 0.35562-0.4682 0.27692-0.54242-1.4022-1.3224-0.0903-3.8548 1.6423-3.1702 2.0854 0.82406 0.9932 4.2742-1.11 3.5064-0.0868-0.03173-0.14247-0.04556-0.1478-0.03683-5e-3 0.0077-0.0803 0.10802-0.16793 0.22295-0.73249 0.96052-1.6735 2.3656-2.5013 3.7346-2.7264 4.5094-4.6714 9.2048-5.6185 13.564-0.0326 0.15004-0.0612 0.27494-0.0634 0.27755-2e-3 2e-3 -0.0689-0.0389-0.14799-0.0921-2.2799-1.5355-7.542-2.6542-13.8-2.934-8.4873-0.37939-16.882 0.85344-19.969 2.9327-0.16593 0.11176-0.15217 0.10751-0.16284 0.0501z" fill="#eee" strokeWidth=".013328" />
                                <text id="timetext-left" style={{ fontFamily: "sans-serif", wordSpacing: "0px", lineHeight: 1.25, whiteSpace: 'pre', fontWeight: 'bold' }}>
                                    <tspan >
                                        <tspan fontSize="28px" x="190.86719" y="174.13718">
                                            {firstTeamTimeObject.minutes}
                                        </tspan>
                                        <tspan fontSize="18px" x="223.86719" y="154.13718">
                                            {firstTeamTimeObject.seconds}
                                        </tspan>
                                    </tspan>
                                </text>
                                <circle id="disactive-left" cx="214.21" cy="159.69" r="33" opacity="0" strokeWidth="5.6878" />
                                <g>
                                    <rect transform="matrix(.99998 -.0060586 .13428 .99094 0 0)" x="113.49" y="91.623" width="30.741" height="4.0748" fill="#b8b5a2" />
                                    <circle transform="rotate(92.397)" d="m 99.599922,-165.9297 a 15,15 0 0 1 -14.757678,14.99804 15,15 0 0 1 -15.234493,-14.51346 l 14.992171,-0.48458 z" fill="#292525" />
                                    <rect x="149.27" y="165.6" width="12.294" height="17.64" fill="#b8b5a2" />
                                    <path id="gong-left"  className={assignClass('white')} d="m189.5-152.26a19.242 22.186 0 0 1-18.931 22.183 19.242 22.186 0 0 1-19.542-21.466l19.232-0.71661z"  />
                                </g>
                                <g id="animationable-left" className={assignClass('white')}>
                                    <rect transform="matrix(.77362 -.63365 .94788 .31863 0 0)" x="-130.57" y="173.77" width="72.182" height="4.3162" fill="#b8b5a2" />
                                    <ellipse transform="matrix(.19683 .98044 -.98193 .18926 0 0)" cx="113.81" cy="-101.49" rx="5.0717" ry="4.8158" />
                                    <ellipse transform="matrix(.94778 .31894 -.30982 .95079 0 0)" cx="101.93" cy="115.72" rx="9.789" ry="9.9894" />
                                </g>
                                <circle id="disabled-circle-left" cx="214.1" cy="159.66" r="35" opacity="0" strokeWidth="5" />
                            </g>
                            <g id="timer-right">
                                <rect x="264.1" y="62.066" width="100" height="140" className="fill-myblue-light" stroke="#292525" strokeWidth="5" />
                                <circle cx="314.1" cy="159.66" r="40" fill="#e6e6e6" stroke="#292525" strokeWidth="5" />
                                <path style={{fill: secondTeamData.color}} d="m297.06 109.23c-0.32508-1.7469-1.225-4.6163-2.1557-6.8729-1.5219-3.6904-3.8608-7.8357-6.0145-10.66-0.0876-0.11493-0.1633-0.21542-0.16811-0.22329-6e-3 -0.0092-0.0604 0.0044-0.15236 0.03787-2.1013 0.76372-3.1879-2.6841-1.1053-3.5071 1.7319-0.68435 3.0439 1.8483 1.6423 3.1701-0.0788 0.07428 0.0215 0.22918 0.83649 1.2916 5.5446 7.2283 9.7837 5.9192 9.04-2.7917-0.12173-1.4257-0.66953-4.5389-1.0218-5.8073-5e-3 -0.01998-0.0185-0.01938-0.12977 0.0062-2.4694 0.56787-3.6204-3.4054-1.3292-4.5882 2.5386-1.3105 4.4546 2.8431 1.9961 4.3273-0.13597 0.08209-0.14924 0.0105 0.10298 0.55551 2.9329 6.3374 5.7891 9.6962 8.419 9.9005 2.6758 0.20784 4.621-3.6037 6.2659-12.278 0.15585-0.8218 0.46493-2.5756 0.46493-2.6382 0-0.01864-0.0246-0.0287-0.11746-0.04819-3.0018-0.62863-2.5823-5.5642 0.473-5.5642 3.0556 0 3.4752 4.9355 0.47298 5.5642-0.0928 0.01944-0.11745 0.02955-0.11745 0.04819 0 0.01299 0.0402 0.25929 0.0893 0.54739 1.782 10.448 3.856 14.789 6.8563 14.348 2.5759-0.37841 5.3502-3.7163 8.1945-9.859 0.26354-0.56917 0.24889-0.49432 0.11283-0.57646-2.4586-1.4842-0.54259-5.6379 1.9961-4.3273 2.2913 1.1828 1.1402 5.1561-1.3292 4.5882-0.11132-0.02558-0.12421-0.02622-0.12972-0.0062-0.14699 0.53346-0.56222 2.5722-0.73684 3.6178-1.0012 5.9947 0.0703 9.7672 2.7424 9.6558 1.7885-0.07454 4.0015-1.9009 6.5721-5.4237 0.38819-0.532 0.35562-0.4682 0.27692-0.54242-1.4022-1.3224-0.0903-3.8548 1.6423-3.1702 2.0854 0.82406 0.9932 4.2742-1.11 3.5064-0.0868-0.03173-0.14247-0.04556-0.1478-0.03683-5e-3 0.0077-0.0803 0.10802-0.16793 0.22295-0.73249 0.96052-1.6735 2.3656-2.5013 3.7346-2.7264 4.5094-4.6714 9.2048-5.6185 13.564-0.0326 0.15004-0.0612 0.27494-0.0634 0.27755-2e-3 2e-3 -0.0689-0.0389-0.14799-0.0921-2.2799-1.5355-7.542-2.6542-13.8-2.934-8.4873-0.37939-16.882 0.85344-19.969 2.9327-0.16593 0.11176-0.15217 0.10751-0.16284 0.0501z" strokeWidth=".013328" />
                                <text id="timetext-right" style={{ transform: "matrix(1.4024 0 0 2.0685 -2.2217 -133.85)", fontFamily: "sans-serif", wordSpacing: "0px", lineHeight: 1.25, whiteSpace: 'pre', fontWeight: 'bold' }}>
                                    <tspan fontSize="28px" x="291.86719" y="174.13718">
                                        {secondTeamTimeObject.minutes}
                                    </tspan>
                                    <tspan fontSize="18px" x="325.86719" y="156.13718">
                                        {secondTeamTimeObject.seconds}
                                    </tspan>
                                </text>
                                <circle id="disactive-right" cx="313.69" cy="159.69" r="33" opacity="0" strokeWidth="5.6878" />
                                <g>
                                    <rect transform="matrix(-.99998 -.0060586 -.13428 .99094 0 0)" x="-414.51" y="88.395" width="30.741" height="4.0748" fill="#b8b5a2" />
                                    <circle transform="matrix(.04182 .99913 .99913 -.04182 0 0)" d="m 121.69844,362.02719 a 15,15 0 0 1 -14.75768,14.99804 15,15 0 0 1 -15.23449,-14.51346 l 14.99217,-0.48458 z" fill="#292525" />
                                    <rect transform="scale(-1,1)" x="-379.1" y="165.6" width="12.294" height="17.64" fill="#b8b5a2" />
                                    <path id="gong-right" className={assignClass('black')} d="m204.04 376.07a19.242 22.186 0 0 1-18.931 22.183 19.242 22.186 0 0 1-19.542-21.466l19.232-0.71661z" />
                                </g>
                                <g id="animationable-right" className={assignClass('black')}>
                                    <rect transform="matrix(-.77362 -.63365 -.94788 .31863 0 0)" x="-329.42" y="-221.67" width="72.182" height="4.3162" fill="#b8b5a2" />
                                    <ellipse transform="matrix(-.19683 .98044 .98193 .18926 0 0)" cx="13.754" cy="416.85" rx="5.0717" ry="4.8158" />
                                    <ellipse transform="matrix(-.94778 .31894 .30982 .95079 0 0)" cx="-400.75" cy="284.34" rx="9.789" ry="9.9894" />
                                </g>
                                <circle id="disabled-circle-right" cx="314.1" cy="159.66" r="35" opacity="0" strokeWidth="5" />
                            </g>
                        </g>
                        <path id="protruding-left" transform="matrix(-.010239 .99995 -.99984 -.018021 0 0)" d="m58.267-72.638a9.8884 7.8534 0 0 1-4.9442 6.8012 9.8884 7.8534 0 0 1-9.8884 0 9.8884 7.8534 0 0 1-4.9442-6.8012" />
                        <path id="protruding-right" transform="matrix(.010239 .99995 .99984 -.018021 0 0)" d="m62.949 187.16a9.8884 7.8534 0 0 1-4.9442 6.8012 9.8884 7.8534 0 0 1-9.8884 0 9.8884 7.8534 0 0 1-4.9442-6.8012" />
                    </g >
                </svg >
    )
}
