import LayoutButton from "components/layout/LayoutButton";
import {
	Box,
	CircularProgress,
	IconButton,
	LinearProgress,
	Skeleton,
	styled,
} from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import { useEffect, useState } from "react";
import uploadPhoto from "api/uploadPhoto";
import http from "api";
import { useDispatch } from "react-redux";
import { setAlert } from "store/slice/status";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Confirm from "components/common/Confirm";

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

function PhotoUpload(props) {
	const minCount = 2;
	const maxCount = 5;

	const { init, changeInit } = props;
	const [loaded, setLoaded] = useState(false);

	const dispatch = useDispatch();
	const [photoInfo, setPhotoInfo] = useState([
		{
			id: null,
			title: `photo-file-${0}`,
			url: null,
			exist: false,
		},
	]);
	const [uploadedCount, setUploadedCount] = useState(0);

	const photoLoad = (photoDataList) => {
		const loadedPhotoData = photoDataList.map((photoData, index) => {
			return {
				id: photoData.id,
				title: `photo-file-${index}`,
				url: `data:image/png;base64,${photoData.physicalData}`,
				exist: true,
			};
		});

		setUploadedCount(loadedPhotoData.length);

		if (loadedPhotoData.length < maxCount) {
			loadedPhotoData.push({
				title: `photo-file-${loadedPhotoData.length}`,
				url: null,
				exist: false,
			});
		}
		setPhotoInfo(loadedPhotoData);
		setLoaded(true);
	};

	useEffect(() => {
		if (init) {
			changeInit();
		}
		http
			.get("/v1/photo")
			.then((response) => {
				const data = response.data.data.photoDataList;
				photoLoad(data);
			})
			.catch((error) => {
				setLoaded(true);
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response,
						},
					}),
				);
			});
	}, []);

	const title = "사진을 올려주세요.";
	const subtitle = `최소 ${minCount}장 이상, 최대 ${maxCount}장 이하로 올려주세요.`;
	const { buttonInfo, data, next } = props;
	//화면에 출력되는 파일
	const [selectedImages, setSelectedImages] = useState([]);
	//서버에 보내지는 파일
	const [selectedFiles, setSelectedFiles] = useState(null);

	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const closeConfirmDialog = () => {
		setDeleteConfirmOpen(false);
		setDeleteTarget(null);
	};

	const [deleteTarget, setDeleteTarget] = useState(null);
	const openDeleteConfirmDialog = (photo) => {
		setDeleteConfirmOpen(true);
		setDeleteTarget(photo);
	};

	const deletePhoto = () => {
		if (init) {
			changeInit(false);
		}
		http
			.delete("/v1/photo", { data: { id: deleteTarget.id } })
			.then((response) => {
				photoLoad(response);
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message,
						},
					}),
				);
			});
	};

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
				if (response.data.status === 200) {
					http
						.get("/v1/photo")
						.then((response) => {
							const data = response.data.data.photoDataList;
							photoLoad(data);
						})
						.catch((error) => {
							setLoaded(true);
							dispatch(
								setAlert({
									alert: {
										open: true,
										type: "error",
										message: error.response.data.message,
									},
								}),
							);
						});
				}
			})
			.catch((error) => {
				dispatch(
					setAlert({
						alert: {
							open: true,
							type: "error",
							message: error.response.data.message,
						},
					}),
				);
			});

		// 첨부파일 삭제시
		setSelectedImages((previousImages) => previousImages.concat(imageArray));
		e.target.value = "";

		// console.log(fileUrlList);
	};

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
						showArrows={false}
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
								<div
									style={{ width: "100%", height: "100%", position: "relative" }}
									key={`image-downloaded-${index}`}>
									<IconButton
										sx={{ position: "absolute" }}
										onClick={() => {
											openDeleteConfirmDialog(photo);
										}}>
										<DeleteForeverOutlinedIcon />
									</IconButton>
									<img
										alt={photo.title}
										src={photo.url}
										style={{ width: "100%", height: "90vw", objectFit: "scale-down" }}
									/>
								</div>
							) : (
								<div
									key={`file-upload-${index}`}
									style={{
										width: "100%",
										height: "90vw",
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
				<LayoutButton
					buttonInfo={buttonInfo}
					data={uploadedCount < 2 ? null : uploadedCount}
					next={next}
				/>
				<Confirm
					confirmOpen={deleteConfirmOpen}
					closeConfirmDialog={closeConfirmDialog}
					title={"사진 삭제"}
					contents={"사진을 삭제합니다."}
					confirm={() => {
						deletePhoto();
						setDeleteConfirmOpen(false);
					}}
				/>
			</div>
		</div>
	);
}

export default PhotoUpload;
