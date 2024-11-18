import { useNavigate, useParams } from 'react-router-dom';
import PrimaryButton from '../common/PrimaryButton';

const Intro_ResultPage = () => {
  // newAccount 혹은 exTech
  const type = useParams().type;
  const navigation = useNavigate();

  console.log(type);
  return (
    <>
      <div>Intro_ResultPage</div>
      <PrimaryButton type="active" text="환테크 시작하기" onClick={() => navigation(`/${type}`)}></PrimaryButton>
    </>
  );
};

export default Intro_ResultPage;
