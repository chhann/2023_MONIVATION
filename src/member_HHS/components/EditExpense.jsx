import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebase';
import { updateDoc, getDoc, doc, deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';
// import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import CategoryBtn from '../../member_PCH/features/CategoryBtn';


export default function EditExpense({ category, price, memo, closeSubModal, installmentId, id, handleDataUpdate }) {
  // uid 불러오기
  // const user = useSelector((state) => state.user.user);

  // 날짜 입력하는 캘린더 모달 state
  const [showCal, setShowCal] = useState(false);

  // form의 입력 값 state
  const [date, setDate] = useState(new Date());
  const [payment, setPayment] = useState("현금");
  //installment??뭐하는 애지 카드 선택하면 뜨는 할부입력
  const [installment, setInstallment] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [editPrice, setEditPrice] = useState(price);
  const [editMemo, setEditMemo] = useState(memo);

  
  // 할부 개월 수 select에서 사용할 배열
  const num = Array(58).fill().map((v,i)=> i+2);

  // 날짜 입력하는 캘린더 모달 on
  const onClickCal = (e) => {
    e.preventDefault();
    setShowCal(true);
  };

  // 날짜 입력하는 캘린더 모달에서 날짜 클릭 시 date 값 입력
  const onClickDate = (newDate) => {
    setDate(newDate);
    setShowCal(false);
  };

    // 캘린더 모달에서 입력한 값을 form에 보여주기 위한 변환 함수
    const changeDate = (newDate) => {
      const YYYY = String(newDate.getFullYear());
      const MM = String(newDate.getMonth()+1).padStart(2,"0");
      const DD = String(newDate.getDate()).padStart(2,"0");
      const valueDate = `${YYYY}-${MM}-${DD}`;
      return valueDate;
    };


  // installment 값 입력
  const onInputInstallment = (e) => {
    if(payment === "카드") {
      return setInstallment(e.target.value);
    } else {
      return setInstallment(1);
    };
  };

  // selectedCategory 값 입력
  const onClickCategory = (e) => {
    setSelectedCategory(e.target.value);
  };
  //////////////////////////////////////
  

    // 파이어스토어에 업데이트
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // 파이어스토어에서 해당 문서를 가져옴
      const expenseRef = doc(db, "money_expense", id);
      const expenseSnap = await getDoc(expenseRef);
      if (expenseSnap.exists()) {
        await updateDoc(expenseRef, {
          category: selectedCategory,
          price: editPrice,
          memo: editMemo,
          date: date,
          payment: payment,
          installment: installment,
        });
      }
  
      closeSubModal();
      
      // 데이터 업데이트 후 상위 컴포넌트의 fetchData 함수 호출
      handleDataUpdate();
    };
  
    // 지출 저장 목록 클릭 시 마다 모달 변함
    useEffect(() => {
      const fetchData = async () => {
      const expenseRef = doc(db, "money_expense", id);
      const expenseSnap = await getDoc(expenseRef);
      if (expenseSnap.exists()) {
        const expenseData = expenseSnap.data();
          setSelectedCategory(expenseData.category);
          setDate(expenseData.date.toDate());
          setEditMemo(expenseData.memo);
          setEditPrice(expenseData.price);
          setPayment(expenseData.payment);
          setInstallment(expenseData.installment);
          console.log(setDate);
        }
      };
  
      fetchData();
    }, [id]);


    // 첫번째 시도 이건 되는데ㅜㅜ
    // const deleteMoney = async () => {
    //   // "money_expense" 컬렉션에서 문서 삭제
    //   await deleteDoc(doc(db, "money_expense", id));
  
    //   // "money_installments" 컬렉션에서 문서 삭제
    //   await deleteDoc(doc(db, "money_installments", installmentId));
  
    //   handleDataUpdate();
    //   closeSubModal();
    // }


    // 두번째 시도 
    // const deleteMoney = async () => {
    //   //"money_installments" 컬렉션에서 문서 삭제
    //   await deleteDoc(doc(db, "money_installments", installmentId));
    
    //   // "money_expense" 컬렉션에서 해당 문서의 ID와 동일한 모든 문서를 삭제
    //   const expenseQuerySnapshot = await getDocs(
    //     collection(db, "money_expense").where("docid", "==", installmentId)
    //   );
    //   const deletePromises = expenseQuerySnapshot.docs.map((doc) =>
    //     deleteDoc(doc.ref)
    //   );
    //   await Promise.all(deletePromises);
    
    //   handleDataUpdate();
    //   closeSubModal();
    // };


    // 세번째 시도 
    // const deleteMoney = async () => {
    //   try {
    //     // "money_installments" 컬렉션에서 문서 삭제
    //     const installmentRef = doc(db, "money_installments", installmentId);
    //     await deleteDoc(installmentRef);
    
    //     // "money_expense" 컬렉션에서 해당 문서의 ID와 동일한 모든 문서를 삭제
    //     const expenseQuerySnapshot = await getDocs(
    //       collection(db, "money_expense").where("docid", "==", installmentId)
    //     );
    
    //     const deletePromises = expenseQuerySnapshot.docs.map((doc) =>
    //       deleteDoc(doc.ref)
    //     );
    //     await Promise.all(deletePromises);
    
    //     handleDataUpdate();
    //     closeSubModal();
    //   } catch (error) {
    //     console.log("삭제 중 오류가 발생했습니다:", error);
    //   }
    // };
    
    // //네번째 시도
    // const deleteMoney = async () => {
    //   // "money_installments" 컬렉션에서 문서 삭제
    //   await deleteDoc(doc(db, "money_installments", installmentId));
    
    //   // "money_expense" 컬렉션에서 해당 문서의 ID와 동일한 모든 문서를 삭제
    //   const expenseQuerySnapshot = await getDocs(
    //     collection(db, "money_expense").where("docid", "==", installmentId)
    //   );
    //   const deletePromises = expenseQuerySnapshot.docs.map((doc) =>
    //     deleteDoc(doc.ref)
    //   );
    //   await Promise.all(deletePromises);
    
    //   handleDataUpdate();
    //   closeSubModal();
    // };



    // const deleteMoney = async () => {
    //   // "money_expense" 컬렉션에서 "docid" 필드가 "installmentId"와 일치하는 문서를 찾기 위한 쿼리 생성
    //   const querySnapshot = await getDocs(query(collection(db, "money_expense"), where("docid", "==", installmentId)));
    
    //   // 찾은 문서들을 순회하며 삭제
    //   querySnapshot.forEach(async (doc) => {
    //     // 문서 삭제
    //     await deleteDoc(doc.ref);
    //   });

    //   // "money_installments" 컬렉션에서 "installmentId"와 일치하는 문서 삭제
    //   await deleteDoc(doc(db, "money_installments", installmentId));

    
    //   handleDataUpdate();
    //   closeSubModal();
    // };
    
    
    const deleteMoney = async () => {
      if(installmentId != null) {

        // "money_expense" 컬렉션에서 "docid" 필드가 "installmentId"와 일치하는 문서를 찾기 위한 쿼리 생성
        const querySnapshot = await getDocs(query(collection(db, "money_expense"), where("docid", "==", installmentId)));
        
        // 찾은 문서들을 순회하며 삭제
        querySnapshot.forEach(async (doc) => {
          // 문서 삭제
          await deleteDoc(doc.ref);
        });
        // "money_installments" 컬렉션에서 "installmentId"와 일치하는 문서 삭제
          await deleteDoc(doc(db, "money_installments", installmentId));
      } else{
        await deleteDoc(doc(db, "money_expense", id));
      }


    
      handleDataUpdate();
      closeSubModal();
    };
    
    


  return (
    <div
      style={{
        position: 'fixed',
        top: '100px',
        right: '90px',
        display: 'flex',
        width: '600px',
        height: '700px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        border: 'solid 2px black '
      }}
    >
      <form action="" onSubmit={ handleSubmit }>

        <label>날짜</label>
        <div>
          <span>{date && changeDate(date)}</span>
          <button onClick={ onClickCal }>아이콘</button>
        </div>
        {
          showCal && (<Calendar onChange={ onClickDate } value={date}/>)
        }

        <label>금액</label>
        <div>
          <input 
            type = "number" 
            min = "0"
            value = {editPrice}
            onChange = {(e) => setEditPrice(Number(e.target.value))}
            required
          />
          <span>₩</span>
        </div>

        <label htmlFor="">결제수단</label>
        <div>
          <select 
            name="payment" 
            id="" 
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option value="현금">현금</option>
            <option value="카드">카드</option>
            <option value="이체">이체</option>
          </select>

            {
              payment && payment === "카드" && (
                <div className='input_installment'>
                  <select className='installment' name="installment" onChange={(e)=>setInstallment(e.target.value)}>
                    <option value="일시불" selected>
                      일시불
                    </option>
                    {
                      num.map((i)=>(
                        <option value={i} key={i}>{i}개월</option>
                      ))
                    }
                  </select>
                </div>
              )
            }
        </div>

        <label>카테고리</label>
        <div>
          <CategoryBtn
            name="일반지출"
            value="카페"
            checked={selectedCategory === "카페"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            카페
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="외식"
            checked={selectedCategory === "외식"}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            외식
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="음주"
            checked={selectedCategory === "음주"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            음주
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="식료/잡화"
            checked={selectedCategory === "식료/잡화"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            식료/잡화
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="교통"
            checked={selectedCategory === "교통"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            교통
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="차량"
            checked={selectedCategory === "차량"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            차량
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="쇼핑"
            checked={selectedCategory === "쇼핑"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            쇼핑
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="문화생활"
            checked={selectedCategory === "문화생활"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            문화생활
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="경조사"
            checked={selectedCategory === "경조사"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            경조사
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="의료"
            checked={selectedCategory === "의료"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            의료
          </CategoryBtn>
          <CategoryBtn
            name="일반지출"
            value="기타"
            checked={selectedCategory === "기타"} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            기타
          </CategoryBtn>
        </div>

        <label>메모</label>
        <div>
          <textarea cols="30" rows="10"
          value={editMemo} onChange={(e) => setEditMemo(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          value="입력" 
          disabled={!date || !editPrice || !selectedCategory}
        />
        <button type='button' onClick={deleteMoney}>삭제</button>
      </form>
    </div>
  )
}
