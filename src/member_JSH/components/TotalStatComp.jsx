import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate  } from 'react-router-dom';
import SavingList from '../../member_LJC/pages/SavingList';

import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where, Timestamp, } from 'firebase/firestore';
import {db} from '../../database/firebase'
import Modal from 'react-modal';
import '../css/totalstat.css';


export default function TotalStatComp({selectedYear, selectedMonth, modalIsOpen2, isModalOpen2, selectedDay}) {
  
  // 저금 리스트 모달창
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [activeModal, setActiveModal] = useState(null);
    const openModal = (modalId) => {
      setActiveModal(modalId);
    };

  const user = useSelector((state) => state.user.user);

  const [savingList , setSavingList] = useState('');

  useEffect(() => {
      getSavingData();
      getIncomeData();
      getIncomeRepeatData();
      getExpenseData();
      getExpenseRepeatData();
  }, [user]);

  useEffect(()=>{
    console.log("현재 년도 :", selectedYear );
    console.log("현재 월 : ", selectedMonth);
    getIncomeData();
    getIncomeRepeatData();
    getExpenseData();
    getExpenseRepeatData();
  },[selectedMonth,modalIsOpen2,isModalOpen2]);


  // 이번 달 총 일반 수입 불러오기
  const [totalIncome, setTotalIncome] = useState('');
  // 총 일반 수입 불러오기
  const [totalIncome2, setTotalIncome2] = useState('');

  // 이번 달 총 고정 수입 불러오기
  const [totalIncomeRp, setTotalIncomeRp] = useState('');
  // 총 고정 수입 불러오기
  const [totalIncomeRp2, setTotalIncomeRp2] = useState('');

  // 이번 달 총 일반 지출 불러오기
  const [totalEx, setTotalEx] = useState('');
  // 총 일반 지출 불러오기
  const [totalEx2, setTotalEx2] = useState('');

  // 이번 달 총 고정 지출 불러오기
  const [totalExRp, setTotalExRp] = useState('');
  // 총 고정 지출 불러오기
  const [totalExRp2, setTotalExRp2] = useState('');



  // 데이터 불러오기
  // 저금액 총액 구하기
  const getSavingData = async () => {
      try {
          const fmCollectionRef = collection(db, "money_saving");
          const fmQuery = query(fmCollectionRef, where('user', '==', user.uid));
          const fmQuerySnapshot = await getDocs(fmQuery);

          if (!user.uid) {
              navigate('/account/login');
          } else {
              let dataArray = [];
              fmQuerySnapshot.forEach((doc) => {
                  dataArray.push({
                  ...doc.data(),
                  id: doc.id,
              });
              });
              
              let total = 0;

              for (let i = 0; i < dataArray.length; i++) {
                let money = dataArray[i].amount;
                const number = parseInt(money.replace(/,/g, ''), 10);
                total += number;
                
              }
              const totalprice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
              setSavingList(totalprice);
          }
      } catch (error) {
          console.log("실패했습니다", error);
      }
  };


  // 일반 지출 불러오기
  // 일반 지출 총액 계산
  const getIncomeData = async () => {
    try{
      const fmCollectionRef = collection(db, "money_income");
      const fmQuery = query(fmCollectionRef, where('uid', '==', user.uid));
      const fmQuerySnapshot = await getDocs(fmQuery);

      if (!user.uid) {
        navigate('/account/login');
      } else {
        let dataArray = [];
        fmQuerySnapshot.forEach((doc)=>{
          dataArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        let total = 0;
        let total2 = 0;
        let total3 = 0;
        const currentDate = new Date();
        for (let i = 0; i < dataArray.length; i++) {
          const dataDay = dataArray[i].date.toDate().getDate();
          const dataMonth = dataArray[i].date.toDate().getMonth() + 1;
          const dataYear = dataArray[i].date.toDate().getFullYear();
          if(dataArray[i].date.toDate().getMonth()+1 == selectedMonth
            && dataArray[i].date.toDate().getFullYear() == selectedYear
          ){
            let money = dataArray[i].price;
            total += money;
          }
          if(dataDay <= currentDate.getDate() && dataMonth <= currentDate.getMonth()+1
          && dataYear <= currentDate.getFullYear()){
            let money2 = dataArray[i].price;
            total2 += money2;
          } else {
            let money3 = dataArray[i].price;
            total3 += money3;
          }
          
        }
        const totalprice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const totalprice2 = total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setTotalIncome(totalprice);
        setTotalIncome2(totalprice2);
      }
    } catch (error){
      console.log("실패했습니다", error);
    }
  }


  // 고정 수입
  const getIncomeRepeatData = async () => {
    try{
      const fmCollectionRef = collection(db, "money_income_repeat");
      const fmQuery = query(fmCollectionRef, where('uid', '==', user.uid));
      const fmQuerySnapshot = await getDocs(fmQuery);

      if (!user.uid) {
        navigate('/account/login');
      } else {
        let dataArray = [];
        fmQuerySnapshot.forEach((doc)=>{
          dataArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        let total = 0;
        let total2 = 0;
        let total3 = 0;
        const currentDate = new Date();
        for (let i = 0; i < dataArray.length; i++) {
          const dataDay = dataArray[i].date.toDate().getDate();
          const dataMonth = dataArray[i].date.toDate().getMonth() + 1;
          const dataYear = dataArray[i].date.toDate().getFullYear();
          if(dataArray[i].date.toDate().getMonth()+1 == selectedMonth
            && dataArray[i].date.toDate().getFullYear() == selectedYear
          ){
            let money = dataArray[i].price;
            total += money;
          }
          if(dataDay <= currentDate.getDate() && dataMonth <= currentDate.getMonth()+1
          && dataYear <= currentDate.getFullYear()){
            let money2 = dataArray[i].price;
            total2 += money2;
          } else {
            let money3 = dataArray[i].price;
            total3 += money3;
          }
          
        }
        const totalprice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const totalprice2 = total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setTotalIncomeRp(totalprice);
        setTotalIncomeRp2(totalprice2);
      }
    } catch (error){
      console.log("실패했습니다", error);
    }
  }

  // 일반 지출
  // if문 쓸때 조심. else를 함부로 쓰면 포함되어야할 데이터가 이전 조건때문에 
  // 제외되거나 들어오지말아야할 데이터가 포함될 수 있음.
  const getExpenseData = async () => {
    try{
      const fmCollectionRef = collection(db, "money_expense");
      const fmQuery = query(fmCollectionRef, where('uid', '==', user.uid));
      const fmQuerySnapshot = await getDocs(fmQuery);

      if (!user.uid) {
        navigate('/account/login');
      } else {
        let dataArray = [];
        fmQuerySnapshot.forEach((doc)=>{
          dataArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        let total = 0;
        let total2 = 0;
        let total3 = 0;
        const currentDate = new Date();
        for (let i = 0; i < dataArray.length; i++) {
          const dataDay = dataArray[i].date.toDate().getDate();
          const dataMonth = dataArray[i].date.toDate().getMonth() + 1;
          const dataYear = dataArray[i].date.toDate().getFullYear();
          if(dataArray[i].date.toDate().getMonth()+1 == selectedMonth
            && dataArray[i].date.toDate().getFullYear() == selectedYear
          ){
            let money = dataArray[i].price;
            total += money;
          }
          if(dataDay <= currentDate.getDate() && dataMonth <= currentDate.getMonth()+1
          && dataYear <= currentDate.getFullYear()){
            let money2 = dataArray[i].price;
            total2 += money2;
          } else {
            let money3 = dataArray[i].price;
            total3 += money3;
          }
          
        }
        const totalprice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const totalprice2 = total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setTotalEx(totalprice);
        setTotalEx2(totalprice2);
      }
    } catch (error){
      console.log("실패했습니다", error);
    }
  }
  

  // 고정 지출
  const getExpenseRepeatData = async () => {
    try{
      const fmCollectionRef = collection(db, "money_expense_repeat");
      const fmQuery = query(fmCollectionRef, where('uid', '==', user.uid));
      const fmQuerySnapshot = await getDocs(fmQuery);

      if (!user.uid) {
        navigate('/account/login');
      } else {
        let dataArray = [];
        fmQuerySnapshot.forEach((doc)=>{
          dataArray.push({
            ...doc.data(),
            id: doc.id,
          });
        });

        let total = 0;
        let total2 = 0;
        let total3 = 0;
        const currentDate = new Date();
        for (let i = 0; i < dataArray.length; i++) {
          const dataDay = dataArray[i].date.toDate().getDate();
          const dataMonth = dataArray[i].date.toDate().getMonth() + 1;
          const dataYear = dataArray[i].date.toDate().getFullYear();
          if(dataArray[i].date.toDate().getMonth()+1 == selectedMonth
            && dataArray[i].date.toDate().getFullYear() == selectedYear
          ){
            let money = dataArray[i].price;
            total += money;
          }
          
          if(dataDay <= currentDate.getDate() && dataMonth <= currentDate.getMonth()+1
          && dataYear <= currentDate.getFullYear()){
            let money2 = dataArray[i].price;
            total2 += money2;
          } else {
            let money3 = dataArray[i].price;
            total3 += money3;
          }
          
        }
        const totalprice = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        const totalprice2 = total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        setTotalExRp(totalprice);
        setTotalExRp2(totalprice2);
      }
    } catch (error){
      console.log("실패했습니다", error);
    }
  }
  
  return (
    <div id='total-stat-wrap'>
        <table>
          <tbody>
            <th className='tb-title'>이번 달 총액</th>
            <tr className='tb-subtitle'>
              <td>고정 수입</td>
            </tr>
            <tr className='tb-money'>
              <td>{totalIncomeRp ? totalIncomeRp : "0"}원</td>
            </tr>
            <tr className='tb-subtitle'>
              <td>일반 수입</td>
            </tr>
            <tr className='tb-money'>
              <td>{totalIncome ? totalIncome : "0"}원</td>
            </tr>
            <tr className='tb-subtitle'>
              <td>고정 지출</td>
            </tr>
            <tr className='tb-money'>
              <td>- {totalExRp ? totalExRp : "0"}원</td>
            </tr>
            <tr className='tb-subtitle'>
              <td>일반 지출</td>
            </tr>
            <tr className='tb-money'>
              <td>- {totalEx ? totalEx : "0"}원</td>
            </tr>
            <tr className='tb-money' style={{backgroundColor:'#D1CAF8'}}>
              <td>
                {
                  parseInt(totalIncome.replace(/,/g, ''), 10)
                  + parseInt(totalIncomeRp.replace(/,/g, ''), 10)
                  - parseInt(totalEx.replace(/,/g, ''), 10)
                  - parseInt(totalExRp.replace(/,/g, ''), 10)
                }원
              </td>
            </tr>
            <tr style={{backgroundColor:'white', height:"1vh"}}>
              <td></td>
            </tr>
            {/** 총 자산 시작 */}
            <tr className='tb-subtitle-totalresult'>
              <td>현재 총 자산</td>
            </tr>
            <tr className='tb-money' style={{backgroundColor:'#F4E8AE'}}>
              <td>
                {
                  parseInt(totalIncome2.replace(/,/g, ''), 10)
                  + parseInt(totalIncomeRp2.replace(/,/g, ''), 10)
                  - parseInt(totalEx2.replace(/,/g, ''), 10)
                  - parseInt(totalExRp2.replace(/,/g, ''), 10)
                }원
              </td>
            </tr>
            <tr style={{backgroundColor:'white', height:"0.8vh"}}>
              <td></td>
            </tr>
            {/* 총 저금액 시작*/}
              <div
                onClick={()=>{
                  setModalIsOpen(true);
                  openModal(3);
                }}
                style={{cursor: "pointer"}}
              >
                <tr className='tb-subtitle-totalresult'>
                  <td>현재 총 저금액</td>
                </tr>
                <tr className='tb-saving' 
                style={{backgroundColor:'#F4E8AE', textAlign:'right'}}>
                  <td>{savingList}원</td>
                </tr>
              </div>
              {activeModal === 3 && (
                <Modal
                  id='calendar_modal'
                  isOpen={modalIsOpen}
                  style={{
                    overlay: {
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                      boxSizing: 'border-box',
                      width: '580px',
                      height: '790px',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: '50px',
                      border: 0
                    }
                  }}
                >
                  <div className='content_container'>
                  <button 
                    className='close_btn'
                    onClick={()=>setModalIsOpen(false)}>
                    x
                  </button>
                  <SavingList setModalIsOpen={setModalIsOpen}/>
                  </div>
                </Modal>
              )}
          {/* 총 저금액 끝 */}
          </tbody>
        </table>
    </div>
  )
}
