import { Navigate } from 'react-router-dom'
import LoadingSpinner from '../../../../b9-stayVista-part4-main/client/src/components/Shared/LoadingSpinner'
import useRole from '../../../../b9-stayVista-part4-main/client/src/hooks/useRole'
import PropTypes from 'prop-types'
const HostRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return <LoadingSpinner />
  if (role === 'host') return children
  return <Navigate to='/dashboard' />
}

export default HostRoute

HostRoute.propTypes = {
  children: PropTypes.element,
}
