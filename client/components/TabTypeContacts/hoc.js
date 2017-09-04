import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addContact } from 'redux/modules/data';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addContact,
}, dispatch)

export default (container) => connect(
  mapStateToProps,
  mapDispatchToProps
)(container)
