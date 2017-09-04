import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import { loadData } from 'redux/modules/data';
import { logout } from 'redux/modules/user';

const mapStateToProps = ({ data, user }) => ({
  data,
  user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  push,
  loadData,
  logout,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
