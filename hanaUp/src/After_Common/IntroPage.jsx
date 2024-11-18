import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';

const IntroPage = () => {
  const navigation = useNavigate();
  return (
    <>
      <div>intropage</div>
      <PrimaryButton type="active" text="환테크 시작하기" onClick={() => navigation('/InvestIntro/newAccount')} />
      <PrimaryButton type="active" text="환테크 시작하기" onClick={() => navigation('/InvestIntro/exTech')} />
    </>
  );
};

export default IntroPage;
