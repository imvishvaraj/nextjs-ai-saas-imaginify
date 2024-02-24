import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'

const AddTransformationTypePage = ({ params: { type } }:
  SearchParamProps) => {
  const transformationType = transformationTypes[type];
  return (
    <>
      <Header
        title={transformationType.title}
        subtitle={transformationType.subTitle}
      />

      <TransformationForm />
    </>
  )
}

export default AddTransformationTypePage