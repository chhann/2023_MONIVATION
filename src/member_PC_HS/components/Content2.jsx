import React from 'react'

export default function Content2({onClose}) {
  return (
    <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }}
    >
        <div style={{
            backgroundColor: "white"
        }}
        >
            <h3>1.개인정보 수집 및 이용 목적</h3>
            <p>-서비스 제공을 위한 회원 가입 및 인증 절차</p>
            <p>-서비스 이용을 위한 개인식별과 계정 관리</p>
            <p>-서비스 제공에 따른 고객 지원 및 문의 응답</p>
            <p>-서비스 개선 및 개인화된 컨텐츠 제공</p>
            <p>-서비스 이용 통계 및 분석, 마케팅 활동에 활용</p>
            <h3>2.수집하는 개인정보의 항목</h3>
            <p>-필수 항목: 이름, 이메일 주소, 연락처, 계정 정보</p>
            <p>-선택 항목: 성별, 생년월일 등 추가 정보</p>
            <h3>3.개인정보의 보유 및 이용 기간</h3>
            <p>-회원 탈퇴 시까지 또는 서비스 제공 목적 달성 후 지체 없이 파기</p>
            <p>-법령에 따른 보존 기간 및 정책에 따라 일정 기간 동안 보관</p>
            <h3>4.개인정보 수집 방법</h3>
            <p>-회원 가입 시 사용자가 직접 입력</p>
            <p>-서비스 이용 과정에서 자동 수집 (쿠키, 로그 파일 등)</p>
            <h3>5.개인정보의 제3자 제공</h3>
            <p>-사용자 동의 없이 개인정보를 제3자에게 제공하지 않음</p>
            <p>-단, 법령에 의거하거나 사용자의 사전 동의를 받은 경우에 한해 제공</p>
            <h3>6.개인정보의 처리 위탁</h3>
            <p>-개인정보 처리를 위탁할 수 있으며, 위탁 시 안전성을 유지하기 위한 필요한 조치를 취함</p>
            <p>-위탁 업체와의 계약 등을 통해 개인정보 보호 의무를 명확히 규정</p>
            <h3>7.개인정보의 국외 이전</h3>
            <p>-개인정보를 해외로 이전하지 않음</p>
            <p>-단, 서비스 제공을 위해 필요한 경우에는 관련 법령을 준수하며 안전성 확보 조치</p>
            <button type='button' onClick={onClose}>닫기</button>
        </div>
    </div>
  )
}
