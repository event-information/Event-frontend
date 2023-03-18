import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { __Join } from '../redux/modules/userSlice';
import { ButtonSmall, FlexHorizontal, FlexVertical, PageContainer, StInput } from '../variables/styleStore'
import useLoginInput from '../variables/useLoginInput';

function UserJoin() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [id,onIdChangeHandler] = useLoginInput('');
  const [password,onPasswordChangeHandler] = useLoginInput('');
  const [nickname,onNickNameChangeHandler] = useLoginInput('');
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newUser = {
      loginid : id,
      password : password,
      nickname : nickname,
    }
    dispatch(__Join(newUser));
    // console.log(newUser);
  }

  return (
    <PageContainer>
      <StForm onSubmit={onSubmitHandler}>
        <FlexVertical alignItems="center" width='auto' justifyContent="center" gap="30px">
          <Warp>
            <FlexHorizontal width='350px;' justifyContent='space-between' height="auto">
              <StInput
                placeholder="ID를 입력하세요"
                value={id}
                onChange={onIdChangeHandler}
                minLength={4}
                maxLength={10}
                required
              />
              <ButtonSmall type="button" onClick={()=>{}}>아이디 중복조회</ButtonSmall>
            </FlexHorizontal>
          </Warp>
          <Warp>
            <FlexHorizontal width='350px;' justifyContent='left' height="auto" >
              <StInput 
              type="password"
              placeholder="Password를 입력하세요" 
              value={password}
              onChange={onPasswordChangeHandler}
              minLength={8}
              maxLength={15}
              required
              />
            </FlexHorizontal>
          </Warp>
          <Warp>
            <FlexHorizontal width='350px;' justifyContent='left' height="auto">
              <StInput 
              placeholder="닉네임을 입력하세요" 
              value={nickname}
              onChange={onNickNameChangeHandler}
              minLength={2}
              maxLength={8}
              required
              />
            </FlexHorizontal>
          </Warp>
          <Warp>
            <FlexHorizontal justifyContent="center" width='350px;' height="auto" gap="20px;">
              <ButtonSmall type="button" onClick={()=>navigation('/')}>뒤로가기</ButtonSmall>
              <ButtonSmall type="submit">가입하기</ButtonSmall>
            </FlexHorizontal>
          </Warp>
        </FlexVertical>
        
      </StForm>
    </PageContainer>
  )
}

export default UserJoin;

const Warp = styled.div`
  width: fit-content;
`
const StForm = styled.form`
  width: 100%;
  height: 100%;
`