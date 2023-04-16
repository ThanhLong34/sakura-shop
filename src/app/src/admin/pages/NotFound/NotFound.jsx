import PageNotFoundAdmin from '@/assets/images/PageNotFoundAdmin.png';

function NotFound() {
	return (
		<div>
			<div className="card text-center">
				<div className="flex justify-alignts-center" style={ {
					maxHeight: '300px'
				}}>
					<img src={PageNotFoundAdmin} alt="page not found image" />
				</div>
				<h2>Ôi không!</h2>
				<h2>Không tìm thấy trang bạn yêu cầu</h2>
			</div>
		</div>
	);
}

export default NotFound;
