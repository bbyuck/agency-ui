import { useEffect } from "react";
import { setLoading } from "store/slice/status";
import { useDispatch, useSelector } from "react-redux";
import api from "api";
import Modal from "@mui/material/Modal";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
	const dispatch = useDispatch();
	const status = useSelector((state) => state.status);

	/**
	 * 로딩 처리
	 */
	useEffect(() => {
		/**
		 * default header per request
		 */
		api.interceptors.request.use(
			(config) => {
				dispatch(setLoading({ loading: true }));
				return config;
			},
			(err) => {
				dispatch(setLoading({ loading: false }));
				return Promise.reject(err);
			},
		);

		api.interceptors.response.use(
			(config) => {
				dispatch(setLoading({ loading: false }));
				return config;
			},
			(err) => {
				dispatch(setLoading({ loading: false }));
				return Promise.reject(err);
			},
		);
	}, []);

	return (
		<>
			<Modal open={status.loading}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "calc(var(--vh, 1vh) * 100);",
					}}>
					<CircularProgress />
				</Box>
			</Modal>
		</>
	);
}

export default Loading;
