import { connect } from 'react-redux'
import { getPortfolios, addPortfolios } from '../employee/EmployeeAction'
import Roles from '../../components/roles'

const mapStateToProps = (state) => ({
  userRoles: state.userReducer.userRoles
})

const mapDispatchToProps = (dispatch) => ({
  getPortfolios: (payload) => dispatch(getPortfolios(payload)),
  addPortfolios: (payload) => dispatch(addPortfolios(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Roles)
