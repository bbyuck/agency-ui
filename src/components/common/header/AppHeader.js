import { useSelector } from "react-redux";
import "style/common/AppHeader.css";
import HeaderBackButton from "components/common/header/HeaderBackButton";

function AppHeader() {
	const header = useSelector((state) => state.header);

	const button = {
		back: <HeaderBackButton />,
		none: null,
	};

	return (
		<div className='container-header'>
			<div className='header'>
				<span className='header-left'>{button[header.leftComponent]}</span>
				<span className='header-right'>{button[header.rightComponent]}</span>
			</div>
		</div>
	);
}

export default AppHeader;
