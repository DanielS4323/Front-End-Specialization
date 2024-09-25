import React from 'react';
type BaseButtonAttributes = React.ComponentPropsWithoutRef<'button'>;

export const enum ButtonSize {
	extraSmall = 'extraS',
	small = 'small',
	medium = 'medium',
	large = 'large',
	extraLarge = 'extraL',
}

export interface ButtonProps extends BaseButtonAttributes {
	buttonText: string;
	size: ButtonSize;
}
