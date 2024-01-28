import LayoutButton from "components/layout/LayoutButton";
import { IconButton, styled } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useState } from "react";
import uploadPhoto from "api/uploadPhoto";

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

function PhotoExchangeSelect(props) {
	const title = "사진을 업로드해주세요.";
	const subtitle = "서로의 사진은 매칭 성사시에만 확인할 수 있어요.";
	const { buttonInfo, data, next } = props;
	//화면에 출력되는 파일
	const [selectedImages, setSelectedImages] = useState([]);
	//서버에 보내지는 파일
	const [selectedFiles, setSelectedFiles] = useState(null);

	const onSelectFile = (e) => {
		e.preventDefault();
		e.persist();
		//선택한 파일
		const selectedFiles = e.target.files;
		//선택한 파일들을 fileUrlList에 넣어준다.
		const fileUrlList = [...selectedFiles];

		// 업로드되는 파일에는 url이 있어야 한다. filePath로 보내줄 url이다.
		//획득한 Blob URL Address를 브라우져에서 그대로 호출 시에 이미지는 표시가 되고 ,
		//일반 파일의 경우 다운로드를 할 수 있다.
		for (let i = 0; i < selectedFiles.length; i++) {
			const nowUrl = URL.createObjectURL(selectedFiles[i]);
			fileUrlList.push(nowUrl[i]);
		}

		setSelectedFiles(fileUrlList);

		//Array.from() 은 문자열 등 유사 배열(Array-like) 객체나 이터러블한 객체를 배열로 만들어주는 메서드이다.
		const selectedFileArray = Array.from(selectedFiles);

		//브라우저 상에 보여질 파일 이름
		const imageArray = selectedFileArray.map((file) => {
			return file.name;
		});

		uploadPhoto(selectedFiles)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});

		// 첨부파일 삭제시
		setSelectedImages((previousImages) => previousImages.concat(imageArray));
		e.target.value = "";

		console.log(fileUrlList);
	};

	const photoInfo = [
		{
			title: "photo_1",
			url: `${process.env.PUBLIC_URL}/assets/images/sample_img_1.jpeg`,
			exist: true,
		},
		{
			title: "photo_2",
			url: null,
			exist: false,
		},
	];

	return (
		<div className='page'>
			<div className='layout-container'>
				<div className='layout-contents'>
					<div className='layout-title' style={{ fontSize: "30px" }}>
						{title}
					</div>
					<div
						className='layout-subtitle'
						style={{ height: "15px", fontSize: "15px" }}>
						{subtitle}
					</div>
				</div>
				<div
					style={{
						width: "90vw",
						height: "90vw",
						position: "absolute",
						top: "30vh",
					}}>
					<Carousel
						showArrows={true}
						showStatus={false}
						showIndicators={true}
						infiniteLoop={false}
						showThumbs={false}
						useKeyboardArrows={false}
						autoPlay={false}
						stopOnHover={false}
						swipeable={true}
						dynamicHeight={false}
						emulateTouch={true}
						autoFocus={false}
						selectedItem={0}
						interval={2000}
						transitionTime={350}
						swipeScrollTolerance={2}>
						{photoInfo.map((photo, index) => {
							return photo.exist ? (
								<div key={index}>
									<img
										alt={photo.title}
										src={photo.url}
										style={{ width: "100%", height: "100%", objectFit: "cover" }}
									/>
								</div>
							) : (
								<div
									style={{
										width: "100%",
										height: "100%",
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}>
									<IconButton
										component='label'
										style={{ width: "100%", height: "100%" }}
										variant='contained'>
										<UploadOutlinedIcon />
										<VisuallyHiddenInput
											type='file'
											onChange={onSelectFile}
											accept='.png, .jpg, image/*'
										/>
									</IconButton>
								</div>
							);
						})}
					</Carousel>
				</div>
				<LayoutButton buttonInfo={buttonInfo} data={data} next={next} />
			</div>
		</div>
	);
}

export default PhotoExchangeSelect;
