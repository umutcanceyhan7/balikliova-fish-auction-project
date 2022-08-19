package com.G01.onlineFishAuction.dataAccess;

import java.util.List;

import javax.persistence.EntityManager;

import com.G01.onlineFishAuction.entities.Code;
import com.G01.onlineFishAuction.exceptions.CodeNotFoundException;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.G01.onlineFishAuction.entities.CooperativeMember;

@Repository
public class HibernateMemberRepository implements ICooperativeMemberRepository{

	private EntityManager entityManager;
	
	@Autowired
	public HibernateMemberRepository(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<CooperativeMember> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<CooperativeMember> members = session.createQuery(" from CooperativeMember",CooperativeMember.class).getResultList();
		return members;
	}

	@Override
	@Transactional
	public CooperativeMember getMember(String username) {
		Session session = entityManager.unwrap(Session.class);
		CooperativeMember member = session.get(CooperativeMember.class, username);
		return member;
	}

	@Override
	@Transactional
	public void recordMember(CooperativeMember member,String code) throws CodeNotFoundException {
		Session session = entityManager.unwrap(Session.class);
		Code codeFound;
		if((codeFound = session.find(Code.class,code))!= null){
			session.delete(codeFound);
			session.saveOrUpdate(member);
		}else{
			throw new CodeNotFoundException("Code is not valid!!");
		}
	}

	@Override
	public void delete(CooperativeMember member) {
		Session session = entityManager.unwrap(Session.class);
		CooperativeMember memberToDelete = session.get(CooperativeMember.class, member.getUsername());
		session.delete(memberToDelete);
	}

}
