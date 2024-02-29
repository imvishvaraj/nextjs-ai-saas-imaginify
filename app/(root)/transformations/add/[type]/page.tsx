import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm';
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const AddTransformationTypePage = async ({ params: { type } }:
  SearchParamProps) => {
  const { userId } = auth();
  const transformationType = transformationTypes[type];

  if (!userId) redirect('sign-in')

  const user = await getUserById(userId);

  return (
    <>
      <Header
        title={transformationType.title}
        subtitle={transformationType.subTitle}
      />

      <TransformationForm
        action="Add"
        userId={user.id}
        type={transformationType.type as TransformationTypeKey}
        creditBalance={user.creditBalance}
      />
    </>
  )
}

export default AddTransformationTypePage