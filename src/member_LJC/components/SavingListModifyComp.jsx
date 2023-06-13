import React, { useState, } from 'react';
import Calendar from 'react-calendar';
import {  doc,  updateDoc, } from 'firebase/firestore';


import {db} from '../../database/firebase'

import '../css/saving.css'

export default function SavingListModifyComp({tmp, getSavingData}) {
    

    const [open, setOpen] = useState(false);
    const [value, onChange] = useState(new Date());

    // 열기 닫기
        const [isCheck, setCheck] = useState(false);

        const [modal, setModal] = useState(false);

        // (기간)시작날짜
        const [ischeck2, setCheck2] = useState(true);
        // (기간) 끝난 날짜
        const [ischeck3, setCheck3] = useState(false);

        const [mindate, setMindate] = useState('');

    
    

    // 수정된 값들
    const [correctiontitle, setCorrectiontitle] = useState(tmp.title);
    const [correctionperiodunit, setCorrectionperiodunit] = useState(tmp.periodunit);
    const [correctionclickday, setCorrectionclickday] = useState(tmp.clickday)
    const [correctionstart, setCorrectionstart] = useState(tmp.startday);
    const [correctionend, setCorrectionend] = useState(tmp.endday);
    const [correctionamount, setCorrectionamount] = useState(tmp.amount);
    const [correctionmemo, setCorrectionmemo] = useState(tmp.memo);

    
    // (저금예정일 선택)클릭한 날짜
    function gu (i) {
        let year = i.getFullYear()
        let month =  ('0' + (i.getMonth() + 1)).slice(-2);
        let day = ('0' + (i.getDate())).slice(-2);
        // 누른 날짜 yyyy-mm-dd 로 변환하기
        let when = `${year}-${month}-${day}`

        setCorrectionclickday(when)
        setCheck(false)
    }

    // (기간)시작날짜 
    function startperiod (i) {
        let year = i.getFullYear()
        let month =  ('0' + (i.getMonth() + 1)).slice(-2);
        let day = ('0' + (i.getDate())).slice(-2);
        // 누른 날짜 yyyy-mm-dd 로 변환하기
        let when = `${year}-${month}-${day}`

    
        setCorrectionstart(when)
        setCheck2(false)
    }

    // (기간)끝 날짜
    function endperiod (i) {
        let year = i.getFullYear()
        let month =  ('0' + (i.getMonth() + 1)).slice(-2);
        let day = ('0' + (i.getDate())).slice(-2);
        // 누른 날짜 yyyy-mm-dd 로 변환하기
        let when = `${year}-${month}-${day}`

    
        setCorrectionend(when)
        setCheck3(false)
    }

    // 금액 ,표시 ex1,000,000
    const handleHyphen = (event) => {
        const value = event.target.value.replace(/[^\d]/g, ''); // 숫자 이외의 문자 제거
        const formattedValue = new Intl.NumberFormat().format(value); // 숫자 형식으로 변환
        event.target.value = formattedValue;
    };

    //값 업데이트
    const updateData = async(id) => {
        console.log(id)
        console.log("수정됨?")

        await updateDoc(doc(db,"money_saving",id), {
            title : correctiontitle,
            clickday : correctionclickday,
            periodunit : correctionperiodunit,
            startday : correctionstart,
            endday : correctionend,
            amount : correctionamount,
            memo : correctionmemo
        });
        getSavingData()
    }



    return (

        <div>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                updateData(tmp.id);
                setOpen(false)
                }
            }
            >
                <div>
                    <button
                        type='button'
                        onClick={() => {setOpen((e) => !e);}}
                    >
                    수정임티
                    </button>
                    {open && (
                        <div>
                            <label htmlFor="">제목</label>
                            <input type="text"
                                required
                                value={correctiontitle}
                                onChange={(e) => setCorrectiontitle(e.target.value)}
                            />
        <br />
                            <label>저금예정일</label>
                            <input type="text" 
                                required
                                value={correctionclickday}
                            />
                            <div>
                            <button
                                type='button'
                                onClick={() => {setCheck((e) => !e); setModal(false);}}
                            >
                            {isCheck ? "닫힘" : "열림"}
                            </button>
                            {isCheck && (
                                <div className='modal-cal modal-cal2'>
                                    <Calendar 
                                        onChange={onChange} 
                                        value={value}
                                        onClickDay={(value, event) => gu(value)}
                                    />
                                </div>
                                
                            )}
                            </div>
        <br />
                            {/* 기간 바꾸기 시작 */}
                                <label htmlFor="">기간(달력포함)</label>
                                <input type="text"
                                    value={correctionstart}
                                />
                                ~
                                <input type="text"
                                    value={correctionend}
                                />
                                {/* 달력버튼 */}
                                <button 
                                    type='button'
                                    onClick={() => {setModal((e) => !e);}}
                                >
                                    달력버튼
                                </button>
                                {/* 기간선택 모달창 */}
                                        {modal && (
                                        <div className='saving-period'>
                                            {/* 시작일 */}
                                            <button
                                                type='button'
                                                onClick={() => {setCheck2((e) => !e); }}
                                            >
                                            <p style={{ color: ischeck2 ? "#BB363F" : "#000" }}>시작일</p>
                                            </button>
                                            {ischeck2 && (
                                                <div className='modal-cal'>
                                                    <Calendar 
                                                        onChange={onChange}
                                                        value={value}
                                                        onClickDay={(value, event) => {startperiod(value); setCheck2(false); setCheck3(true); setMindate(value);}}
                                                    />
                                                </div>
                                            )}

                                            {/* 종료일 */}
                                            <button
                                                type='button'
                                                onClick={() => {setCheck3((e) => !e);} }
                                            >
                                            <p style={{ color: ischeck3 ? "#BB363F" : "#000" }}>종료일</p>
                                            </button>
                                            {ischeck3 && (
                                                <div className='modal-cal'>
                                                    <Calendar 
                                                        onChange={onChange} 
                                                        value={value}
                                                        onClickDay={(value, event) => {endperiod(value); setCheck3(false);}}
                                                        minDate={mindate}
                                                    />
                                                </div>
                                            )}
                                            </div>
                                        )}
                            {/* 기간 바꾸기 끝 */}
        <br />



                            <label htmlFor="">매월,매주,매일</label>
                            <select 
                                    value={correctionperiodunit}
                                    onChange={(e) => setCorrectionperiodunit(e.target.value)}
                                >
                                    <option value="value" selected disabled>
                                        기간을 선택해주세요.
                                    </option>
                                    <option value="day">매일</option>
                                    <option value="week">매주</option>
                                    <option value="month">매월</option>
                                    <option value="year">매년</option>
                                </select>
        <br />

                            <label htmlFor="">금액</label>
                            <input type="text"
                                onInput={handleHyphen}
                                value={correctionamount}
                                onChange={e => setCorrectionamount(e.target.value)}
                            />
        <br />
                            <label htmlFor="">메모</label>
                            <input type="text"
                                value={correctionmemo}
                                onChange={e => setCorrectionmemo(e.target.value)}
                            />
        <br />
                            <button
                                type='sumbit'
                                
                            >수정값입력
                            </button>
                                            
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}
