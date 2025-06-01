import '@/styles/main.scss';
import EditSvg from "@/assets/images/Edit.svg";
import { StatCard, Contribution, UserProfileCard } from "@/components/molecules";

export default function ExamplePage() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'black' }}>
      <h1 className="text-primary" style={{ marginBottom: '20px' }}>디자인 시스템</h1>
      
      <div style={{ 
        padding: '20px', 
        marginBottom: '20px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}>
        <h2>기본 타이포그래피</h2>
        <p>기본 폰트: Pretendard, 16px</p>
        <p>이것은 웹사이트 전체에서 사용되는 기본 텍스트 스타일입니다.</p>
      </div>
      
      <div style={{ 
        padding: '20px', 
        marginBottom: '20px', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '8px'
      }}>
        <h2>기본 색상</h2>
        <div style={{ 
          width: '100px', 
          height: '100px', 
          backgroundColor: '#57F98E', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: '8px',
          color: 'white',
          marginTop: '10px'
        }}>
          #57F98E
        </div>
        <p style={{ marginTop: '10px' }}>브랜드 색상: 초록색</p>
      </div>
      
      <button className="bg-primary" style={{ 
        padding: '10px 16px', 
        border: 'none', 
        borderRadius: '4px', 
        cursor: 'pointer'
      }}>
        기본 버튼
      </button>

      <div style={{ margin: '40px 0' }}>
        <h2>SVG 직접 임포트 사용 예제</h2>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {/* 기본 SVG */}
          <EditSvg />
          
          {/* 속성 조정 */}
          <EditSvg width={32} height={32} />
          
          {/* 색상 변경 */}
          <EditSvg fill="#57F98E" />
          
          {/* 여러 속성 조합 */}
          <EditSvg 
            width={48} 
            height={48} 
            fill="blue"
            style={{ opacity: 0.7 }}
          />

          <StatCard variant="uploads" value={100} />

          <Contribution percentage={37} />

          <UserProfileCard
            userName="waggle"
            email="LGU+frontend@gmail.com"
            location="서대문구 대현동"
            joinDate="2024. 08. 11"
          />
        </div>
      </div>
    </div>
  );
} 