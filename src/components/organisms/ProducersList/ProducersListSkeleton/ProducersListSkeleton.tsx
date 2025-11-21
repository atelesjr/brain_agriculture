import React from 'react';
import {
	Bar,
	SkeletonItem,
	SkeletonRoot,
} from './ProducersListSkeleton.styles';

interface ProducersListSkeletonProps {
	count?: number;
}

const ProducersListSkeleton: React.FC<ProducersListSkeletonProps> = ({
	count = 11,
}) => {
	return (
		<SkeletonRoot>
			{Array.from({ length: count }).map((_, i) => (
				<SkeletonItem key={i}>
					<Bar width="30%" height="16px" />
					<Bar width="60%" height="12px" />
					<div style={{ display: 'flex', gap: 8 }}>
						<Bar width="25%" height="10px" />
						<Bar width="25%" height="10px" />
						<Bar width="25%" height="10px" />
					</div>
				</SkeletonItem>
			))}
		</SkeletonRoot>
	);
};

export default ProducersListSkeleton;
