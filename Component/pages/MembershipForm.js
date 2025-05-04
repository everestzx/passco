import React, { useState } from 'react';
import '../stylez/MembershipForm.css';

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    lastName: '', firstName: '', middleName: '', suffix: '', dateOfBirth: '', age: '', gender: '',
    civilStatus: '', religion: '', addressPermanent: '', addressPresent: '', contactNumber: '',
    emailAddress: '', facebookName: '', occupation: '', jobTitle: '', dateHired: '',
    monthlyIncome: '', employer: '', employerContact: '', employerAddress: '',
    employmentStatus: '', education: '', schoolLastAttended: '', tin: '', sss: '',
    pagibig: '', philhealth: '', umid: '', otherId: '', householdSize: '', spouseName: '',
    spouseBirthdate: '', spouseMobile: '', spouseEmail: '', beneficiaries: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/membership-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        alert("Membership Application Submitted!");
      } else {
        alert("Submission failed: " + data.message);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="form-container">
      <form className="membership-form" onSubmit={handleSubmit}>
        <h2 className="form-title">MEMBERSHIP APPLICATION FORM</h2>
        
        <div className="form-section">
          <h3 className="section-title">PERSONAL INFORMATION</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Middle Name</label>
              <input type="text" name="middleName" onChange={handleChange} />
            </div>
            <div className="form-group small">
              <label>Suffix</label>
              <input type="text" name="suffix" onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date" name="dateOfBirth" onChange={handleChange} required />
            </div>
            <div className="form-group small">
              <label>Age</label>
              <input type="text" name="age" onChange={handleChange} />
            </div>
            <div className="form-group small">
              <label>Gender</label>
              <select name="gender" onChange={handleChange} value={formData.gender}>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Civil Status</label>
              <select name="civilStatus" onChange={handleChange} value={formData.civilStatus}>
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Religion</label>
              <select name="religion" onChange={handleChange} value={formData.religion}>
                <option value="">Select</option>
                <option value="Catholic">Catholic</option>
                <option value="Christian">Christian</option>
                <option value="Islam">Islam</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">CONTACT INFORMATION</h3>
          <div className="form-row">
            <div className="form-group wide">
              <label>Permanent Address</label>
              <input type="text" name="addressPermanent" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group wide">
              <label>Present Address</label>
              <input type="text" name="addressPresent" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Contact Number</label>
              <input type="text" name="contactNumber" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="emailAddress" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Facebook Name</label>
              <input type="text" name="facebookName" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">EMPLOYMENT INFORMATION</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Occupation</label>
              <input type="text" name="occupation" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="jobTitle" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date Hired</label>
              <input type="date" name="dateHired" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Monthly Income</label>
              <input type="text" name="monthlyIncome" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Employment Status</label>
              <select name="employmentStatus" onChange={handleChange} value={formData.employmentStatus}>
                <option value="">Select</option>
                <option value="Regular">Regular</option>
                <option value="Contractual">Contractual</option>
                <option value="Probationary">Probationary</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Employer</label>
              <input type="text" name="employer" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Employer Contact</label>
              <input type="text" name="employerContact" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group wide">
              <label>Employer Address</label>
              <input type="text" name="employerAddress" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">EDUCATION & GOVERNMENT IDS</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Highest Education</label>
              <select name="education" onChange={handleChange} value={formData.education}>
                <option value="">Select</option>
                <option value="High School">High School</option>
                <option value="College">College</option>
                <option value="Vocational">Vocational</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
            </div>
            <div className="form-group wide">
              <label>School Last Attended</label>
              <input type="text" name="schoolLastAttended" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>TIN</label>
              <input type="text" name="tin" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>SSS</label>
              <input type="text" name="sss" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>PAG-IBIG</label>
              <input type="text" name="pagibig" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>PhilHealth</label>
              <input type="text" name="philhealth" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>UMID</label>
              <input type="text" name="umid" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Other ID</label>
              <input type="text" name="otherId" onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">FAMILY INFORMATION</h3>
          <div className="form-row">
            <div className="form-group small">
              <label>Household Size</label>
              <input type="text" name="householdSize" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Spouse Name</label>
              <input type="text" name="spouseName" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Spouse Birthdate</label>
              <input type="date" name="spouseBirthdate" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Spouse Mobile</label>
              <input type="text" name="spouseMobile" onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Spouse Email</label>
              <input type="email" name="spouseEmail" onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group wide">
              <label>Beneficiaries (Full Name, Relationship, Birthdate)</label>
              <textarea name="beneficiaries" onChange={handleChange} rows="3"></textarea>
            </div>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="submit-button">SUBMIT APPLICATION</button>
        </div>
      </form>
    </div>
  );
};

export default MembershipForm;
