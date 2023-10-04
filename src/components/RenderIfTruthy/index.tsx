type RenderIfTruthyProps<T> = {
	prop: T;
	children: React.ReactNode | React.ReactNode[];
};

export function RenderIfTruthy<T>({ prop, children }: RenderIfTruthyProps<T>) {
	if (!prop) return null;
	return <>{children}</>;
}
