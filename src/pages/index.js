const Index = () => {
  return null
}

export async function getServerSideProps() {

  return {
    redirect: {
      permanent: false,
      destination: '/login'
    }
  }

}

export default Index