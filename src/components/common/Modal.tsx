import {ComponentPropsWithoutRef} from 'react'

interface ModalProps extends ComponentPropsWithoutRef<'div'> {
  onCloseBtn: () => void;
}

export default function Modal(
  { children, onCloseBtn, }: ModalProps,
) {

  return (
  	// 블러 처리된 모달의 뒷 배경
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-30 backdrop-blur-sm animate-fade-in"
      onClick={onCloseBtn}
      aria-label="모달 뒷 배경"
    >
      {/* 모달 프레임 */}
      <section
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-2xl bg-white px-8 py-10 shadow-lg md:px-10 md:py-12"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') e.stopPropagation();
        }}
      >
      
        {/* 모달 닫기 버튼(X 아이콘) */}
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
          onClick={onCloseBtn}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* 모달 안에 들어갈 내용(프롭스로 전달 받음) */}
        <div className="text-gray-800">{children}</div>
      </section>
    </div>
  );
}