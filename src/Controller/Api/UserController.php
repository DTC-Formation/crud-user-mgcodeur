<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Form\UserType;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController
{
    public function __construct(private UserRepository $userRepository){}

    public function index(): Response
    {
        return $this->json($this->userRepository->findAll());
    }

    public function show(int $id): Response
    {
        $user = $this->userRepository->find($id);
        if (!$user) return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        return $this->json($user);
    }

    public function store(Request $request): Response
    {
        
        $user = new User();
        
        $form = $this->createForm(UserType::class, $user);
        
        $form->submit($request->toArray());

        if (
            $form->isSubmitted() && 
            $form->isValid()
        ) {
            $this->userRepository->save($user, true);
            return $this->json($user, Response::HTTP_CREATED);
        }

        return $this->json($form->getErrors(true, false), Response::HTTP_BAD_REQUEST);
    }

    public function update(Request $request, int $id): Response
    {
        $user = $this->userRepository->find($id);

        if (!$user) return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);

        $form = $this->createForm(UserType::class, $user);
        $datas = $request->toArray();

        unset($datas['id']);
        $form->submit($datas);
        
        if (
            $form->isSubmitted() && 
            $form->isValid()
        ) {
            $this->userRepository->save($user, true);
            return $this->json($user, Response::HTTP_OK);
        }

        return $this->json($form->getErrors(true, false), Response::HTTP_BAD_REQUEST);
    }

    public function delete(int $id): Response
    {
        $user = $this->userRepository->find($id);

        if (!$user) return $this->json(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        
        $this->userRepository->remove($user, true);

        return $this->json(['success' => 'L\'utilisateur a bien été supprimé']);
    }
}
