interface ActionMain {
  loading: (status: boolean) => void;
}
export let actionMain: ActionMain;
export const actionInit = (props: any) => {
  actionMain = {
    loading: (status: boolean) => props.setLoading({status}),
  };
};
export const removeAccents = (str: String) => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
};
