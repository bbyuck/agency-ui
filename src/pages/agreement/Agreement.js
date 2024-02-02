import { useEffect, useState } from "react";
import LinearHeader from "components/common/header/LinearHeader";
import { useDispatch, useSelector } from "react-redux";
import { TEMP } from "constants/memberCode";

import http from "api";
import { setAlert } from "store/slice/status";
import messages from "messages";
import { NEXT } from "constants/buttonType";
import { authenticate } from "store/slice/auth";
import { DISCLAIMER, PERSONAL_INFORMATION_USE } from "constants/codes";
import SelectMultiLayout from "components/layout/SelectMultiLayout";
import AgreementForm from "components/agreement/AgreementForm";
import { useNavigate } from "react-router-dom";
import { setMemberCode, setMemberStatus } from "store/slice/memberInfo";

function Agreement() {
	const dispatch = useDispatch();
	const { oauthId, oauthCode } = useSelector((state) => state.auth);
	const { memberCode, memberStatus } = useSelector((state) => state.memberInfo);
	const navigate = useNavigate();

	useEffect(() => {
		if (memberCode !== TEMP || memberStatus !== TEMP) {
			navigate("/", { replace: true });
			return;
		}

		const params = {
			oauthCode: oauthCode,
			oauthId: oauthId,
		};

		http
			.get("/v1/agreement/check", { params })
			.then((response) => {
				if (response.data.data) {
					navigate("/join", { replace: true });
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, [memberCode, memberStatus, navigate, oauthCode, oauthId, dispatch]);

	const [personalInformationUseAgree, setPersonalInformationUseAgree] =
		useState(false);
	const [
		personalInformationUseAgreementOpen,
		setPersonalInformationUseAgreementOpen,
	] = useState(false);

	const [disclaimerAgree, setDisclaimerAgree] = useState(false);
	const [disclaimerAgreementOpen, setDisclaimerAgreeOpen] = useState(false);

	const agreements = [
		{
			id: PERSONAL_INFORMATION_USE,
			open: personalInformationUseAgreementOpen,
			agree: () => {
				setPersonalInformationUseAgree(true);
			},
			disagree: () => {
				setPersonalInformationUseAgree(false);
			},
			handleClose: () => {
				setPersonalInformationUseAgreementOpen(false);
			},
			opener: () => {
				setPersonalInformationUseAgreementOpen(true);
			},
		},
		{
			id: DISCLAIMER,
			open: disclaimerAgreementOpen,
			agree: () => {
				setDisclaimerAgree(true);
			},
			disagree: () => {
				setDisclaimerAgree(false);
			},
			handleClose: () => {
				setDisclaimerAgreeOpen(false);
			},
			opener: () => {
				setDisclaimerAgreeOpen(true);
			},
		},
	];
	const selectList = [
		{
			label: "개인정보 이용 동의",
			value: PERSONAL_INFORMATION_USE,
			handler: () => {
				// setPersonalInformationUseAgree(true);
			},
			selected: personalInformationUseAgree,
		},
		{
			label: "면책 사항 동의",
			value: DISCLAIMER,
			handler: () => {},
			selected: disclaimerAgree,
		},
	];

	const title = "이용 약관을 확인해주세요.";
	const subtitle = "";

	const beforeSelect = (index) => {
		if (selectList[index].selected) {
			return;
		}
		agreements[index].opener();
	};

	const submit = () => {
		http
			.put("/v1/agreement", {
				oauthCode: oauthCode,
				oauthId: oauthId,
				agreements: [
					{
						agreementCode: PERSONAL_INFORMATION_USE,
						agree: personalInformationUseAgree,
					},
					{
						agreementCode: DISCLAIMER,
						agree: disclaimerAgree,
					},
				],
			})
			.then((response) => {
				dispatch(authenticate(response.data.data));
				dispatch(setMemberStatus(response.data.data.memberStatus));
				dispatch(setMemberCode(response.data.data.memberCode));
			})
			.catch((error) => {
				console.log(error);
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response
								? error.response.data.message
								: messages.error.connect_to_server,
						},
					}),
				);
			});
	};

	return (
		<>
			<LinearHeader />
			<div className='page'>
				<SelectMultiLayout
					title={title}
					subtitle={subtitle}
					list={selectList}
					selectBeforeHandler={beforeSelect}
					buttonInfo={{ type: NEXT }}
					next={submit}
					data={
						personalInformationUseAgree && disclaimerAgree
							? personalInformationUseAgree && disclaimerAgree
							: null
					}
				/>
			</div>
			{agreements.map((agreement, index) => {
				return (
					<AgreementForm
						key={`agreement-${index}`}
						id={agreement.id}
						open={agreement.open}
						agree={agreement.agree}
						disagree={agreement.disagree}
						handleClose={agreement.handleClose}
					/>
				);
			})}
		</>
	);
}

export default Agreement;
