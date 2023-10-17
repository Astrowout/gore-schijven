import { PAGE_PROPS } from '@/config';
import { getPlainText } from '@/utils';

export const getMetadata = (props: any) => ({
    title: getPlainText(props![PAGE_PROPS.metaTitle].rich_text),
    description: getPlainText(props![PAGE_PROPS.metaDescription].rich_text),
    openGraph: {
        title: getPlainText(props![PAGE_PROPS.ogTitle].rich_text),
        description: getPlainText(props![PAGE_PROPS.metaDescription].rich_text),
    },
});