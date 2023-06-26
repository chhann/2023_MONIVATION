// import React from 'react'
// import '../css/select.css'

// export default function SelcectComp() {
//     /* 화살표 함수 */
// const label = document.querySelector('.label');
// const options = document.querySelectorAll('.optionItem');

// // 클릭한 옵션의 텍스트를 라벨 안에 넣음
//     const handleSelect = (item) => {
//     label.parentNode.classList.remove('active');
//     label.innerHTML = item.textContent;
//     }
//     // 옵션 클릭시 클릭한 옵션을 넘김
//     options.forEach(option => {
//         option.addEventListener('click', () => handleSelect(option))
//     })

//     // 라벨을 클릭시 옵션 목록이 열림/닫힘
//     label.addEventListener('click', () => {
//     if(label.parentNode.classList.contains('active')) {
//         label.parentNode.classList.remove('active');
//     } else {
//         label.parentNode.classList.add('active');
//     }
//     })



//     return (
//         <div>
//             <button class="label">fruits 🍊</button>
//             <ul class="optionList">
//                 <li class="optionItem">apple</li>
//                 <li class="optionItem">orange</li>
//                 <li class="optionItem">grape</li>
//                 <li class="optionItem">melon</li>
//             </ul>
//         </div>
//     )
// }

import React, { useState } from 'react';
import '../css/select.css';

export default function SelectComp() {
    const [selectedOption, setSelectedOption] = useState('fruits 🍊');
    const [isActive, setIsActive] = useState(false);

    const handleSelect = (item) => {
        
        setSelectedOption(item);
        setIsActive(false);
    };

    const toggleOptions = () => {
        setIsActive(!isActive);
    };
    // console.log("과일",selectedOption)

    return (
        <div className={`selectBox2 ${isActive ? 'active' : ''}`}>
        <button className="label" onClick={toggleOptions}>
            {selectedOption}
        </button>
        <ul className={`optionList ${isActive ? 'active' : ''}`}>
            <li className="optionItem" onClick={() => handleSelect('apple')}>
            apple
            </li>
            <li className="optionItem" onClick={() => handleSelect('orange')}>
            orange
            </li>
            <li className="optionItem" onClick={() => handleSelect('grape')}>
            grape
            </li>
            <li className="optionItem" onClick={() => handleSelect('melon')}>
            melon
            </li>
        </ul>
        </div>
    );
}